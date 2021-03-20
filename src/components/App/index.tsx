import 'configs/runConcent';
// +++ node modules +++
import React from 'react';
import { getUrlChangedEvName, ConnectRouter } from 'react-router-concent';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { useConcent } from 'concent';
// +++ project modules +++
import { CtxDe } from 'types/store';
import SiderSwitchIcon from 'components/biz-dumb/SiderSwitchIcon';
import { getBasename, getRelativeRootPath } from 'services/appPath';
import { path2menuItem, path2menuGroup } from 'configs/derived/menus';
// +++ local modules +++
import Routes from './Routes';
import Sider from './Sider';
import Footer from './Footer';
import Header from './Header';

function setup({ effect, globalReducer }: CtxDe) {
  effect(() => {
    globalReducer.prepareApp()
  }, []);
}

function App() {
  const { globalReducer, globalState, globalComputed } = useConcent<{}, CtxDe>({ setup, tag: 'App' });
  const siderVisible = globalState.siderVisible;

  let uiContentArea = '' as React.ReactNode;
  if (!globalState.isAppReady) {
    uiContentArea = <Spin>系统初始化中...</Spin>
  } else {
    uiContentArea = <Routes />;
  }

  return (
    <Layout>
      <Layout>
        <Header />
      </Layout>
      <Layout>
        <SiderSwitchIcon des={globalComputed.siderIconDes} onClick={globalReducer.toggleSiderVisible} />
        {siderVisible && <Sider />}
      </Layout>
      {uiContentArea}
      <Footer />
    </Layout>
  );
}

export default React.memo(() => {
  return (
    <BrowserRouter basename={`/${getBasename()}`}>
      <ConnectRouter callUrlChangedOnInit={true}>
        <App />
      </ConnectRouter>
    </BrowserRouter>
  );
});
