import React from 'react';
import { Tabs, Tooltip, Switch } from 'antd';
import { SettingOutlined, QuestionOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { history } from 'react-router-concent';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuItem, path2menuGroup } from 'configs/derived/menus';
import { EmptyView, Blank } from 'components/dumb/general';
import * as arrUtil from 'utils/arr';
import styles from './App.module.css';

const { TabPane } = Tabs;
const stItemIcon = { marginRight: '6px' };

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
    changeIsTabPaneHeavyBg: (isTabPaneHeavyBg: boolean) => {
      ctx.gr.changeIsTabPaneHeavyBg(isTabPaneHeavyBg);
    },
  };
}

// 渲染导航面包屑 + 标签页
function QuickNavBar() {
  const { globalState: { curActiveRoutePath, activeRoutePaths, themeColor, isTabPaneHeavyBg },
    settings: se, globalComputed: gcu, gr,
  } = useSetupCtx(setup, { tag: 'TipHeader' });
  const menuItem = path2menuItem[curActiveRoutePath];
  if (!menuItem) {
    return <EmptyView />;
  }

  const search = activeRoutePaths.find(v => v.path === curActiveRoutePath)?.search || '';

  return (
    <div className={`quickNavBarWrapBase ${gcu.navBarItemCls}`} style={gcu.quickNavBarStyle}>
      <Tabs
        style={{ paddingLeft: '3px', display: 'inline-block' }}
        activeKey={`${curActiveRoutePath}${search}`}
        hideAdd
        onChange={se.onChange}
        onEdit={se.onEdit}
        type="editable-card"
      >
        {activeRoutePaths.map(({ path, search }) => {
          const navMenus = se.getNavMenus(path);
          const item = arrUtil.lastItem(navMenus);
          const uiIcon = item.Icon ? <item.Icon style={stItemIcon} /> : <QuestionOutlined style={stItemIcon} />;
          const navLen = navMenus.length;
          const uiTab = (
            <Tooltip key={`${path}${search}`} title={navMenus.map((item, i) => <span key={i} >{(navLen > 1 && i > 0) ? ' / ' : ''}{item.label}</span>)}>
              <span >{uiIcon}{item.label}</span>
            </Tooltip>
          );
          return <TabPane tab={uiTab} key={`${path}${search}`} />;
        })}
      </Tabs>
      <div className={styles.headerSettingInBar}>
        <Switch checked={isTabPaneHeavyBg} style={{ verticalAlign: 'text-bottom' }}
          onClick={se.changeIsTabPaneHeavyBg} checkedChildren="深" unCheckedChildren="浅"
        />
        <Blank width="6px" />
        {gcu.settingIconShowCtrl.showInBar
          && <SettingOutlined onClick={se.openThemeSettingsDrawer}
            style={{ color: themeColor }}
          />
        }
      </div>
    </div>
  );
}

export default React.memo(QuickNavBar);
