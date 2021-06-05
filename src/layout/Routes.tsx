/* eslint-disable react/no-children-prop */
/**
 * 根据 configs/menus 配置组装整个应用的路由系统
 */
import React, { Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { register, cst } from 'concent';
import { getUrlChangedEvName } from 'react-router-concent';
import { Layout } from 'antd';
import { getRelativeRootPath } from 'services/appPath';
import { path2menuItem, path2menuGroup, flattedMenus } from 'configs/derived/menus';
import { IMenuItem } from 'configs/menus';
import NotFound from 'pages/NotFound';
import { CtxDe } from 'types/store';
import styles from './App.module.css';

const { Content } = Layout;

const Fallback = () => {
  return <div>Loading...</div>;
};

class Routes extends React.Component {
  public ctx = {} as CtxDe;
  public errOccurred = false;

  public state: { err: string } = { err: '', };

  // 构建一次后就缓存路由组件，否则会在边栏收起时造成页面组件卸载并再挂载
  public cachedUi: Record<string, any> = { uiRoutes: null, uiHomeRoute: null, uiNotFound: null };
  public cachedUiCompWrapContent: Record<string, { ui: any, layoutStyle: any }> = {};

  public $$setup() {
    this.ctx.effect(() => {
      this.changeNavData();
    }, []);

    this.ctx.on(getUrlChangedEvName(), (param, action, history) => {
      console.log(param, action, history);
      if (this.errOccurred) {
        this.errOccurred = false;
        this.setState({ err: '' });
      }
      this.changeNavData();
    });
  }

  // 修改为当前页面头部对应的导航提示路径
  public changeNavData = () => {
    const curAppPath = getRelativeRootPath();
    const menuItem = path2menuItem[curAppPath];
    if (menuItem) {
      const navMenus = [];
      navMenus.unshift(menuItem);
      const menuGroup = path2menuGroup[curAppPath];
      if (menuGroup) {
        navMenus.unshift(menuGroup);
      }
      this.ctx.setGlobalState({ navMenus });
    }
  }

  public componentDidCatch(err: any) {
    this.errOccurred = true;
    this.setState({ err: err.message });
  }

  // 提示当前路由页崩溃
  public renderCrashTip = () => {
    return (
      <Layout style={this.ctx.globalComputed.contentLayoutStyle}>
        <h1 style={{ color: 'red', padding: '64px' }}>
          当前路由页面崩溃，请联系 xxx开发者 做进一步跟踪，如果是开发者，可打开console查看具体错误,
          如想继续访问当前页面，可刷新浏览器重试。
        </h1>
      </Layout>
    );
  }

  public renderChildren = (item: IMenuItem, props: RouteComponentProps) => {
    console.warn('Render CompWrap');
    const { setContentLayout } = item;
    const { contentLayoutStyle } = this.ctx.globalComputed;

    // beforeComponentMount 可能返回一个替换的视图
    let uiReplaceRouteComp: React.ReactNode | void = '';
    const executed = React.useRef(false);
    if (!executed.current) {
      executed.current = true;
      if (item.beforeComponentMount) {
        uiReplaceRouteComp = item.beforeComponentMount(props);
      }
    }

    let { ui: uiCompWrapContent, layoutStyle } = this.cachedUiCompWrapContent[item.path] || {};
    // layout 没变才返回缓存
    if (uiCompWrapContent && layoutStyle === contentLayoutStyle) return uiCompWrapContent;

    const uiTargetComp = uiReplaceRouteComp || <item.Component {...props} />;
    if (setContentLayout) {
      uiCompWrapContent = (
        <Layout style={contentLayoutStyle}>
          <Layout style={{ padding: '24px' }}>
            <Content className={styles.contentWrap}>
              {uiTargetComp}
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      uiCompWrapContent = (
        <Layout style={contentLayoutStyle}>
          {uiTargetComp}
        </Layout>
      );
    }

    this.cachedUiCompWrapContent[item.path] = { ui: uiCompWrapContent, layoutStyle: contentLayoutStyle };
    return uiCompWrapContent;
  }

  // 创建一个渲染包含有【布局信息】和【路由组件】的组件
  public makeCompWrap = (item: IMenuItem) => {
    console.warn('makeCompWrap');
    return (props: RouteComponentProps) => {
      return this.renderChildren(item, props);
    };
  }

  // 根据配置构造路由
  public buildRouteUi = () => {
    if (this.cachedUi.uiRoutes) return this.cachedUi;

    let homeMenuItem: IMenuItem | null = null;
    const uiRoutes = flattedMenus.map((item) => {
      if (item.isHomePage) homeMenuItem = item;
      const CompWrap = this.makeCompWrap(item);
      // todo: keepalive
      return <Route key={item.path} exact={item.exact} path={item.path} component={CompWrap} />;
      // return <Route key={item.path} exact={item.exact} path={item.path}
      //   children={(props: RouteComponentProps) => this.renderChildren(item, props)}
      // />;
    });

    let uiHomeRoute: React.ReactNode = '';
    if (homeMenuItem) {
      // let item = homeMenuItem;
      const CompWrap = this.makeCompWrap(homeMenuItem);
      uiHomeRoute = <Route exact={true} path={'/'} component={CompWrap} />;
      // uiHomeRoute = <Route exact={true} path={'/'} children={(props: RouteComponentProps) => this.renderChildren(item, props)} />;
    }

    const CompNotFoundWrap = this.makeCompWrap({ Component: NotFound, path: '', label: '' });
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
      <Suspense fallback={<Fallback />}>
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
