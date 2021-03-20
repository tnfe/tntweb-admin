/**
 * 根据 configs/menus 配置组装整个应用路由系统
 */
import React, { Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { register, cst } from 'concent';
import { getUrlChangedEvName } from 'react-router-concent';
import { Layout, Breadcrumb } from 'antd';
import { getRelativeRootPath } from 'services/appPath';
import { path2menuItem, path2menuGroup, flatedMenus } from 'configs/derived/menus';
import { IMenuItem, IMenuGroup } from 'configs/menus';
import { NormalBlank } from 'components/dumb/general';
import NotFound from 'pages/NotFound';
import { CtxDe } from 'types/store';
import styles from './App.module.css';

const { Content } = Layout;
class Routes extends React.Component {
  ctx = {} as CtxDe;
  errOccurred = false;

  state = {
    err: '',
    curMenus: [] as Array<IMenuGroup | IMenuItem>,
  };

  $$setup() {
    this.ctx.on(getUrlChangedEvName(), () => {
      if (this.errOccurred) {
        this.errOccurred = false;
        this.setState({ err: '' });
      }
    });

    this.ctx.effect(() => {
      this.setAppPathLabel();
    }, []);

    this.ctx.on(getUrlChangedEvName(), (param, action, history) => {
      console.log(param, action, history);
      this.setAppPathLabel();
    });
  }

  setAppPathLabel = () => {
    const curAppPath = getRelativeRootPath();
    const menuItem = path2menuItem[curAppPath];
    if (menuItem) {
      const curMenus = [];
      curMenus.unshift(menuItem);
      const menuGroup = path2menuGroup[curAppPath];
      if (menuGroup) {
        curMenus.unshift(menuGroup);
      }
      this.setState({ curMenus });
    }
  }

  componentDidCatch(err: any) {
    this.errOccurred = true;
    this.setState({ err: err.message });
  }

  renderCrashTip = () => {
    return (
      <h1 style={{ color: 'red' }}>
        当前路由页面崩溃，请联系 xxx开发者 做进一步跟踪，如果是开发者，可打开console查看具体错误,
        如想继续访问当前页面，可刷新留浏览器重试。
      </h1>
    );
  }

  renderNavBreadcrumb = () => {
    return (
      <Breadcrumb style={{ paddingLeft: '16px', height: '32px', lineHeight: '32px', backgroundColor: 'white' }}>
        {this.state.curMenus.map((item, i) => {
          let uiIcon = item.Icon ? <item.Icon /> : '';
          return <Breadcrumb.Item key={i}>{uiIcon}<NormalBlank/>{item.label}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    );
  }

  makeCompWrap = (item: IMenuItem) => {
    return (props: RouteComponentProps) => {
      const { showBreadcrumb = true, setContentLayout = true } = item;
      let uiBreadcrumb = '' as React.ReactNode;
      if (showBreadcrumb) uiBreadcrumb = this.renderNavBreadcrumb();
      const { contentLayoutStyleNoPadding } = this.ctx.globalComputed;

      if (setContentLayout) {
        return (
          <Layout style={contentLayoutStyleNoPadding}>
            {uiBreadcrumb}
            <Layout style={{ padding: '24px' }}>
              <Content id="appContentArea" className={styles.contentWrap}>
                <item.Component {...props} />
              </Content>
            </Layout>
          </Layout>
        );
      }

      return (
        <Layout style={contentLayoutStyleNoPadding}>
          {uiBreadcrumb}
          <item.Component {...props} />
        </Layout>
      );
    };
  }

buildRouteUi = () => {
  let homeMenuItem = null as IMenuItem | null;
  const uiRoutes = flatedMenus.map((item) => {
    if (item.isHomePage) homeMenuItem = item;
    const CompWrap = this.makeCompWrap(item);
    return <Route key={item.path} exact={item.exact} path={item.path} component={CompWrap} />;
  });

  let uiHomeRoute = '' as React.ReactNode;
  if (homeMenuItem) {
    const CompWrap = this.makeCompWrap(homeMenuItem);
    uiHomeRoute = <Route exact={true} path={'/'} component={CompWrap} />;
  }
  return { uiRoutes, uiHomeRoute };
}

render() {
  if (this.errOccurred) {
    return this.renderCrashTip();
  }
  const { uiRoutes, uiHomeRoute } = this.buildRouteUi();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {uiRoutes}
        {uiHomeRoute}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
}

export default register(cst.MODULE_DEFAULT)(Routes);
