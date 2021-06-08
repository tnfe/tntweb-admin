import React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { history } from 'react-router-concent';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuItem, path2menuGroup } from 'configs/derived/menus';
import { EmptyView } from 'components/dumb/general';
import styles from './App.module.css';

const { TabPane } = Tabs;
const stBreadWrap = { display: 'inline-block', verticalAlign: 'top', paddingLeft: '16px', lineHeight: '32px', backgroundColor: 'white' };
const stItemSel = { color: 'var(--theme-color)' };

function setup(ctx: CtxDe) {
  return {
    onChange: (curActiveRoutePathMayIncludeSearch: string) => {
      const [curActiveRoutePath] = curActiveRoutePathMayIncludeSearch.split('?');
      ctx.setGlobalState({ curActiveRoutePath });
      history.push(curActiveRoutePathMayIncludeSearch);
    },
    onEdit: async (curActiveRoutePathMayIncludeSearch: React.MouseEvent | React.KeyboardEvent | string, action: string) => {
      if (action === 'remove' && typeof curActiveRoutePathMayIncludeSearch === 'string') {
        const [curActiveRoutePath] = curActiveRoutePathMayIncludeSearch.split('?');
        const ret = await ctx.gr.delActiveRoutePath(curActiveRoutePath);
        history.push(`${ret.curActiveRoutePath}${ret.search}`);
      }
    },
    getNavMenus: (path: string) => {
      const navMenus: Array<IMenuGroup | IMenuItem> = [];
      const menuItem = path2menuItem[path];
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
  const { globalState: { curActiveRoutePath, activeRoutePaths, themeColor },
    settings, globalComputed: gcu,
  } = useSetupCtx(setup, { tag: 'TipHeader' });
  const menuItem = path2menuItem[curActiveRoutePath];
  if (!menuItem) {
    return <EmptyView />;
  }

  const search = activeRoutePaths.find(v => v.path === curActiveRoutePath)?.search || '';

  return (
    <div className="quickNavBarWrap smallScBar" style={gcu.quickNavBarStyle}>
      <Tabs
        style={{ paddingLeft: '32px', display: 'inline-block' }}
        activeKey={`${curActiveRoutePath}${search}`}
        hideAdd
        onChange={settings.onChange}
        onEdit={settings.onEdit}
        type="editable-card"
      >
        {activeRoutePaths.map(({ path, search }) => {
          const navMenus = settings.getNavMenus(path);
          const stItem = path === curActiveRoutePath ? stItemSel : {};
          const uiTab = <Breadcrumb style={stBreadWrap}>
            {navMenus.map((item, i) => {
              const uiIcon = item.Icon ? <item.Icon /> : '';
              return <Breadcrumb.Item key={i}><span style={stItem}>{uiIcon}{item.label}</span></Breadcrumb.Item>;
            })}
          </Breadcrumb>;
          return <TabPane tab={uiTab} key={`${path}${search}`} />;
        })}
      </Tabs>
      {gcu.settingIconShowCtrl.showInBar
        && <SettingOutlined onClick={settings.openThemeSettingsDrawer} className={styles.headerSettingInBar}
          style={{ color: themeColor }}
        />
      }
    </div>
  );
}

export default React.memo(QuickNavBar);
