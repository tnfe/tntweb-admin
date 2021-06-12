// +++ node modules +++
import React from 'react';
import { ConnectRouter } from 'react-router-concent';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Layout } from 'antd';
// +++ project modules +++
import { CtxDe } from 'types/store';
import SiderSwitchIcon from 'components/dumb/SiderSwitchIcon';
import { getBasename } from 'services/appPath';
import { useC2DefaultMod } from 'services/concent';
// +++ local modules +++
import Sider from './Sider';
import Footer from './Footer';
import MainContent from './MainContent';
import Header from './Header';
import QuickNavBar from './QuickNavBar';
import SettingDrawer from './SettingDrawer';
import SettingIcon from './components/SettingIcon';

function setup({ effect, globalReducer }: CtxDe) {
  effect(() => {
    globalReducer.prepareApp();
  }, []);
}

function App() {
  const { globalReducer, globalComputed: gcu } = useC2DefaultMod({ setup, tag: 'App' });
  return (
    <Layout>
      <Layout>
        {gcu.isHeaderAboveNavBar ? <Header /> : <QuickNavBar />}
        {!gcu.isHeaderAboveNavBar ? <Header /> : <QuickNavBar />}
        <SettingIcon />
      </Layout>
      <Layout>
        <SiderSwitchIcon des={gcu.siderInfo.iconDes} onClick={globalReducer.toggleSiderVisible} />
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
