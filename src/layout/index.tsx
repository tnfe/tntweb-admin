// +++ node modules +++
import React from 'react';
import { ConnectRouter } from 'react-router-concent';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// +++ project modules +++
import { CtxDe } from 'types/store';
import { getBasename } from 'services/appPath';
import { useC2DefaultMod } from 'services/concent';
import { LoginStatus } from 'configs/constant/sys';
// +++ local modules +++
import TopContent from './TopContent';
import MainContent from './MainContent';
import LeftContent from './LeftContent';
import Footer from './Footer';
import SettingDrawer from './components/SettingDrawer';
import Login from './components/Login';
import WaterMark from './components/WaterMark';

function setup({ effect, globalReducer }: CtxDe) {
  effect(() => {
    // 执行一次自动登录流程
    globalReducer.loginByCookie();
  }, []);
}

function App() {
  const { globalState: gst } = useC2DefaultMod({ setup, tag: 'TntWebApp' });

  // 仅当是登录失败时，才渲染登录页
  if (gst.loginStatus === LoginStatus.LOGIN_FAILED) {
    return <Login />;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <WaterMark />
        <TopContent />
        <LeftContent />
        <MainContent />
        <Footer />
        <SettingDrawer />
      </Layout>
    </ConfigProvider>
  );
}

export default React.memo(() => {
  const RootRouter: any = window.location.hostname.includes('github.io') ? HashRouter : BrowserRouter;
  return (
    <RootRouter basename={`/${getBasename()}`}>
      <ConnectRouter callUrlChangedOnInit={true}>
        <App />
      </ConnectRouter>
    </RootRouter>
  );
});
