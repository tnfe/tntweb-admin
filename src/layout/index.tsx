// +++ node modules +++
import React from 'react';
import { ConnectRouter } from 'react-router-concent';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { cst } from 'concent';
// +++ project modules +++
import { CtxDe } from 'types/store';
import SiderSwitchIcon from 'components/dumb/SiderSwitchIcon';
import { getBasename } from 'services/appPath';
import { useC2Mod } from 'services/concent';
// +++ local modules +++
import Sider from './Sider';
import Footer from './Footer';
import MainContent from './MainContent';
import Header from './Header';
import QuickNavBar from './QuickNavBar';
import SettingDrawer from './SettingDrawer';

function setup({ effect, globalReducer }: CtxDe) {
  effect(() => {
    globalReducer.prepareApp();
  }, []);
}

function App() {
  const { globalReducer, globalComputed } = useC2Mod(cst.MODULE_DEFAULT, { setup, tag: 'App' });
  return (
    <Layout>
      <Layout>
        <Header />
        <QuickNavBar />
      </Layout>
      <Layout>
        <SiderSwitchIcon des={globalComputed.siderInfo.iconDes} onClick={globalReducer.toggleSiderVisible} />
        <Sider />
      </Layout>
      <MainContent />
      <Footer />
      <SettingDrawer />
    </Layout>
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
