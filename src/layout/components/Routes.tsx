/* eslint-disable react/no-children-prop */
/**
 * 根据 configs/menus 配置组装整个应用的路由系统
 */
import React, { Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { register, cst } from 'concent';
import { useSetup } from 'services/concent';
import { getUrlChangedEvName } from 'react-router-concent';
import { Layout, Result } from 'antd';
import { getMenuData } from 'configs/derived/menus';
import { IMenuItem } from 'configs/menus';
import Error403 from 'components/dumb/Error403';
import Error404 from 'components/dumb/Error404';
import * as typeUtil from 'utils/type';
import { decideVal } from 'utils/obj';
import { CtxDe } from 'types/store';
import SkeletonScreen from './SkeletonScreen';
import styles from '../styles/App.module.css';

const { Content } = Layout;

let key = 0;
function setup(ctx: CtxDe) {
  key = key + 1;
  const ins = ctx.initState({
    key,
  });
  ctx.on('refreshRouterGuard', () => {
    key = key + 1;
    ins.setState({ key });
  });
  return {
    state: ins.state,
  };
}

/**
 * menu 里配置的路由组件透传的props类型
 */
export interface IMenuRouterCompProps {
  extraData?: Record<string, any>;
  routerProps: RouteComponentProps;
}
interface IRouterGuardProps extends IMenuRouterCompProps {
  Comp: React.ComponentType<any>;
}
const RouterGuard = React.memo((props: IRouterGuardProps) => {
  const settings = useSetup(setup);
  const passProps = { ...props.routerProps, extraData: props.extraData || {} };
  // @ts-ignore
  return <props.Comp key={settings.state.key} {...passProps} />;
});

class Routes extends React.Component {
  public ctx = typeUtil.typeVal<CtxDe>({});
  public errOccurred = false;

  public state: { err: string } = { err: '' };

  // 构建一次后就缓存路由组件，否则会在边栏收起时造成页面组件卸载并再挂载
  public cachedUi: Record<string, any> = { uiRoutes: null, uiHomeRoute: null, uiNotFound: null };
  public cachedUiCompWrapContent: Record<string, { ui: any, layoutStyle: any }> = {};

  public $$setup() {
    this.ctx.on(getUrlChangedEvName(), (param, action, history) => {
      console.log(param, action, history);
      if (this.errOccurred) {
        this.errOccurred = false;
        this.setState({ err: '' });
      }
    });
  }

  public componentDidCatch(err: any) {
    this.errOccurred = true;
    this.setState({ err: err.message });
  }

  // 提示当前路由页崩溃
  public renderCrashTip = () => {
    return (
      <Layout style={this.ctx.globalComputed.contentLayoutStyle.hasPadding}>
        <Result status="500" title="渲染错误" subTitle="当前页面出现渲染错误，请联系相关人员 xxx 排查" />
      </Layout>
    );
  }

  public renderChildrenWithContentWrap(children: React.ReactNode) {
    const { contentLayoutStyle } = this.ctx.globalComputed;
    return <Layout style={contentLayoutStyle.hasPadding}>
      <Content className={styles.contentWrap}>
        {children}
      </Content>
    </Layout>;
  }

  public renderChildrenWithNoContentWrap(children: React.ReactNode) {
    const { contentLayoutStyle } = this.ctx.globalComputed;
    // className is only for marking dom position
    return <Layout className="ChildrenWithNoContentWrap" style={contentLayoutStyle.hasNoPadding}>
      {children}
    </Layout>;
  }

  public renderChildren = (item: IMenuItem, props: RouteComponentProps, inputSetContentLayout?: boolean) => {

  }

  // 创建一个渲染包含有【路由组件】的组件
  public makeCompWrap = (item: IMenuItem, inputSetContentLayout?: boolean) => {
    return (props: RouteComponentProps) => {
      const setContentLayout = decideVal(inputSetContentLayout, item.setContentLayout);
      const { contentLayoutStyle } = this.ctx.globalComputed;

      // check auth
      if (item.authId && !this.ctx.globalState.authIds.includes(item.authId)) {
        return this.renderChildrenWithContentWrap(<Error403 />);
      }

      // beforeComponentMount 可能返回一个替换的视图
      let uiReplaceRouteComp: React.ReactNode | void = '';
      const executed = React.useRef(false);
      if (!executed.current) {
        executed.current = true;
        if (item.beforeComponentMount) {
          uiReplaceRouteComp = item.beforeComponentMount(props);
        }
      }

      const ret = this.cachedUiCompWrapContent[item.path] || {};
      let { ui: uiCompWrapContent } = ret;
      const { layoutStyle } = ret;
      // layout 没变才返回缓存
      if (uiCompWrapContent && layoutStyle === contentLayoutStyle) return uiCompWrapContent;

      const uiTargetComp = uiReplaceRouteComp || <RouterGuard Comp={item.Component} routerProps={props} />;
      if (setContentLayout) {
        uiCompWrapContent = this.renderChildrenWithContentWrap(uiTargetComp);
      } else {
        uiCompWrapContent = this.renderChildrenWithNoContentWrap(uiTargetComp);
      }

      this.cachedUiCompWrapContent[item.path] = { ui: uiCompWrapContent, layoutStyle: contentLayoutStyle };
      return uiCompWrapContent;
    };
  }

  // 根据配置构造路由
  public buildRouteUi = () => {
    if (this.cachedUi.uiRoutes) return this.cachedUi;

    let homeMenuItem: IMenuItem | null = null;
    const uiRoutes = getMenuData().flattedMenus.map((item) => {
      if (item.isHomePage) homeMenuItem = item;
      const CompWrap = this.makeCompWrap(item);
      // todo: keepalive
      return <Route key={item.path} exact={item.exact} path={item.path} component={CompWrap} />;
    });

    let uiHomeRoute: React.ReactNode = '';
    if (homeMenuItem) {
      const CompWrap = this.makeCompWrap(homeMenuItem);
      uiHomeRoute = <Route exact={true} path={'/'} component={CompWrap} />;
    }

    // 第二位参数传递 true， 让404 页面包裹一下 content layout
    const CompNotFoundWrap = this.makeCompWrap({ Component: Error404, path: '', label: '' }, true);
    const uiNotFoundRoute = <Route component={CompNotFoundWrap} />;

    this.cachedUi = { uiRoutes, uiHomeRoute, uiNotFoundRoute };
    return this.cachedUi;
  }

  public render() {
    if (this.errOccurred) {
      return this.renderCrashTip();
    }
    const { uiRoutes, uiHomeRoute, uiNotFoundRoute } = this.buildRouteUi();
    return (
      <Suspense fallback={<SkeletonScreen label="页面加载中..." />}>
        <Switch>
          {uiRoutes}
          {uiHomeRoute}
          {uiNotFoundRoute}
        </Switch>
      </Suspense>
    );
  }
}

export default register(cst.MODULE_DEFAULT)(Routes);
