import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { CtxDe } from 'types/store';
import { SelectInfo } from 'rc-menu/lib/interface';
import menus, { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuGroup, homePageFullPath } from 'configs/derived/menus';
import { sys } from 'configs/constant';
import { getRelativeRootPath } from 'services/appPath';
import { useSetupCtx } from 'services/concent';
import Logo from './dumb/Logo';
import './resetMenu.css';
import styles from './App.module.css';

const { Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;
const { siderWidthPx } = sys;

function iState() {
  // 获取路由参数，确定展开的菜单
  let path = getRelativeRootPath();
  if (path === '/') path = homePageFullPath; // 确保home页时左侧菜单能够正确的点亮
  const groupKeys = path2menuGroup[path]?.key;

  return {
    selectedKeys: [path],
    openKeys: [groupKeys],
  };
}

function setup(ctx: CtxDe) {
  const ins = ctx.initState(iState);

  return {
    insState: ins.state,
    changeSelectedKeys: ({ selectedKeys }: SelectInfo) => {
      ins.setState({ selectedKeys: selectedKeys?.map(item => `${item}`) });
    },
    openMenus: (openKeys: React.Key[]) => {
      ins.setState({ openKeys: openKeys?.map(item => `${item}`) });
    },
    renderMenuItem: (menuItem: IMenuItem) => {
      const { showInSider = true, Icon, path, label } = menuItem;
      if (!showInSider) return '';
      const uiIcon = Icon ? <Icon /> : '';
      return <MenuItem key={path}>
        <Link to={path}>{uiIcon}{label}</Link>
      </MenuItem>;
    },
  };
}

function AppSider() {
  const { settings: se, globalState } = useSetupCtx(setup, { tag: 'Sider' });
  return (
    <Sider width={siderWidthPx} className={`${styles.siderWrap} layout-sider`} theme={globalState.siderTheme}>
      <Logo fixed={true} />
      <Menu
        theme={globalState.siderTheme}
        onSelect={se.changeSelectedKeys}
        onOpenChange={se.openMenus}
        mode="inline"
        selectedKeys={se.insState.selectedKeys}
        openKeys={se.insState.openKeys}
        style={{ height: '100%', borderRight: 0 }}
        className="main-menu"
      >
        {menus.map((item) => {
          const groupItem = item as IMenuGroup;
          if (groupItem.children) {
            const uiGroupItemIon = groupItem.Icon ? <groupItem.Icon /> : '';
            return (
              <SubMenu key={groupItem.key} className="siderSubMenu" title={
                <span> {uiGroupItemIon}{groupItem.label} </span>
              }>
                {groupItem.children.map(childItem => se.renderMenuItem(childItem))}
              </SubMenu>
            );
          }
          const menuItem = item as IMenuItem;
          return se.renderMenuItem(menuItem);
        })}
      </Menu>
    </Sider>
  );
}

export default React.memo(AppSider);
