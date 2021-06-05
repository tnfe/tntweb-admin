import React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { history } from 'react-router-concent';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuItem, path2menuGroup } from 'configs/derived/menus';
import * as defaultVals from 'configs/constant/defaultVals';
import { decideVal } from 'utils/obj';
import { NormalBlank, EmptyView } from 'components/dumb/general';
import styles from './App.module.css';

const { TabPane } = Tabs;
const stBreadWrap = { display: 'inline-block', verticalAlign: 'top', paddingLeft: '16px', lineHeight: '32px', backgroundColor: 'white' };
const stItemSel = { color: 'var(--theme-color)' };

function setup(ctx: CtxDe) {
  return {
    onChange: (curActiveRoutePath: string) => {
      ctx.setGlobalState({ curActiveRoutePath });
      history.push(curActiveRoutePath);
    },
    onEdit: async (targetPath: React.MouseEvent | React.KeyboardEvent | string, action: string) => {
      if (action === 'remove' && typeof targetPath === 'string') {
        const ret = await ctx.gr.delActiveRoutePath(targetPath);
        history.push(ret.curActiveRoutePath);
      }
    },
    getNavMenus: (path: string) => {
      const navMenus: Array<IMenuGroup | IMenuItem> = [];
      const menuItem = path2menuItem[path]
      menuItem && navMenus.unshift(menuItem);
      const menuGroup = path2menuGroup[path];
      menuGroup && navMenus.unshift(menuGroup);
      return navMenus;
    },
    openThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: true }),
  };
}

// 渲染导航面包屑 + 标签页
function QuickNavBar() {
  let uiQuickNavBar: React.ReactElement = <EmptyView />;
  const { globalState: { curActiveRoutePath, activeRoutePaths },
    settings, globalComputed: gcu,
  } = useSetupCtx(setup, { tag: 'TipHeader' });
  let showQuickNavBar = true;
  const menuItem = path2menuItem[curActiveRoutePath];
  if (menuItem) {
    showQuickNavBar = decideVal(menuItem.showQuickNavBar, defaultVals.showQuickNavBar);
  }
  if (!showQuickNavBar) return uiQuickNavBar;

  return (
    <div className="quickNavBarWrap" style={gcu.quickNavBarStyle}>
      <Tabs
        style={{ paddingLeft: '32px', display: 'inline-block' }}
        activeKey={curActiveRoutePath}
        hideAdd
        onChange={settings.onChange}
        onEdit={settings.onEdit}
        type="editable-card"
      >
        {activeRoutePaths.map(path => {
          const navMenus = settings.getNavMenus(path);
          const stItem = path === curActiveRoutePath ? stItemSel : {};
          const uiTab = <Breadcrumb style={stBreadWrap}>
            {navMenus.map((item, i) => {
              const uiIcon = item.Icon ? <item.Icon /> : '';
              return <Breadcrumb.Item key={i}><span style={stItem}>{uiIcon}{item.label}</span></Breadcrumb.Item>;
            })}
          </Breadcrumb>;
          return <TabPane tab={uiTab} key={path} />
        })}
      </Tabs>
      {gcu.settingIconShowCtrl.showInBar &&
        <SettingOutlined onClick={settings.openThemeSettingsDrawer} className={styles.headerSettingInBar}
          style={{ color: gcu.headerStyle.color }}
        />
      }
    </div>
  );
}

export default React.memo(QuickNavBar);
