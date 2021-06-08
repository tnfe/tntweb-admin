import React from 'react';
import { Layout, Avatar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Blank } from 'components/dumb/general';
import { useSetupCtx } from 'services/concent';
import { CtxDe } from 'types/store';
import Logo from './dumb/Logo';
import styles from './App.module.css';

function setup(ctx: CtxDe) {
  return {
    openThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: true }),
  };
}

function AppHeader() {
  const { globalState: gst, globalComputed: gcu, settings: se } = useSetupCtx(setup);

  return (
    <Layout.Header className={styles.header} style={gcu.headerStyle}>
      { !gcu.siderInfo.showSider && <Logo />}
      <div className={styles.userIconWrap}>
        <Avatar size={32} src={gst.userIcon} />
        <Blank width="8px" />
        {gst.userName}
      </div>
      {gcu.settingIconShowCtrl.showInHeader &&
        <SettingOutlined onClick={se.openThemeSettingsDrawer} className={styles.headerSetting}
          style={{ color: gst.themeColor }}
        />
      }
    </Layout.Header>
  );
}

export default React.memo(AppHeader);
