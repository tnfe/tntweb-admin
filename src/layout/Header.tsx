import React from 'react';
import { Layout, Popover, Switch, Tag, Avatar } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';
import { SettingOutlined } from '@ant-design/icons';
import { Blank, VerticalBlank } from 'components/dumb/general';
import { useSetupCtx, useC2DefaultMod } from 'services/concent';
import { CtxDe } from 'types/store';
import Logo from './dumb/Logo';
import { SiderMenus } from './Sider';
import styles from './App.module.css';

const stSiderMenus: React.CSSProperties = { boxShadow: 'none', paddingLeft: '12px', maxWidth: '80%', display: 'inline-block' };

export function setup(ctx: CtxDe) {
  const { globalReducer: grd } = ctx;
  return {
    onWebsiteColorChange(colorResult: ColorResult) {
      grd.changeThemeColor(colorResult.hex);
    },
    onSiderThemeChange(checked: boolean) {
      grd.switchSiderTheme(checked);
    },
    onHeaderThemeChange(checked: boolean) {
      grd.switchHeaderTheme(checked);
    },
    onFixHeaderChange(checked: boolean) {
      grd.switchFixHeader(checked);
    },
    onInnerMockChange(checked: boolean) {
      grd.changeIsInnerMock(checked);
    },
  };
}

export function SettingPanel() {
  const { globalState: gst, globalComputed: gcu, settings: se } = useSetupCtx(setup, { tag: 'SettingPanel' });

  return (
    <div style={{ padding: '12px 28px' }}>
      <Tag color="geekblue">站点主题设置：</Tag>
      <VerticalBlank />
      <SketchPicker color={gcu.headerStyle.color} onChange={se.onWebsiteColorChange}
        onChangeComplete={se.onWebsiteColorChange}
      />
      <VerticalBlank />
      <div>
        <Tag color="geekblue">暗黑边栏：</Tag>
        <Blank />
        <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gcu.siderThemeSwitchChecked}
          onChange={se.onSiderThemeChange}
        />
      </div>
      <VerticalBlank />
      <div>
        <Tag color="geekblue">暗黑顶栏：</Tag>
        <Blank />
        <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gcu.headerThemeSwitchChecked}
          onChange={se.onHeaderThemeChange}
        />
      </div>
      <VerticalBlank />
      <div>
        <Tag color="geekblue">固定顶栏：</Tag>
        <Blank />
        <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gst.fixHeader}
          onChange={se.onFixHeaderChange}
        />
      </div>
      <VerticalBlank />
      <div>
        <Tag color="geekblue">innerMock设置：</Tag>
        <Blank />
        <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gst.isInnerMock}
          onChange={se.onInnerMockChange}
        />
      </div>
    </div>
  );
}



function AppHeader() {
  const { globalState: gst, globalComputed: gcu } = useC2DefaultMod();

  return (
    <Layout.Header className={styles.header} style={gcu.headerStyle}>
      { !gst.siderVisible && <Logo />}
      { !gst.siderVisible && <SiderMenus mode="horizontal" style={stSiderMenus} />}
      <div className={styles.userIconWrap}>
        <Avatar size={32} src={gst.userIcon} />
        <Blank width="8px" />
        {gst.userName}
      </div>
      <Popover placement="bottomLeft" content={<SettingPanel />} title="主题设置" trigger="click">
        <SettingOutlined className={styles.headerSetting} style={{ color: gcu.headerStyle.color }} />
      </Popover>
    </Layout.Header>
  );
}

export default React.memo(AppHeader);
