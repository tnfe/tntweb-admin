import React from 'react';
import { Layout, Avatar } from 'antd';
import { Blank } from 'components/dumb/general';
import { useC2DefaultMod } from 'services/concent';
import Logo from './components/Logo';
import SettingIcon from './components/SettingIcon';
import styles from './App.module.css';

function AppHeader() {
  const { globalState: gst, globalComputed: gcu } = useC2DefaultMod();

  return (
    <Layout.Header className={styles.header} style={gcu.headerStyle}>
      { !gcu.siderInfo.showSider && <Logo />}
      <div className={styles.userIconWrap} style={{ color: gcu.headerStyle.color }}>
        <Avatar size={32} src={gst.userIcon} />
        <Blank width="8px" />
        {gst.userName}
      </div>
      {gcu.settingIconCtrl.showInHeader && <SettingIcon mode="header" />}
    </Layout.Header>
  );
}

export default React.memo(AppHeader);
