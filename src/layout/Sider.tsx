import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getUrlChangedEvName } from 'react-router-concent';
import { MenuMode, SelectInfo } from 'rc-menu/lib/interface';
import { CtxDe } from 'types/store';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { path2menuGroup, homePageFullPath, showingMenus } from 'configs/derived/menus';
import { sys } from 'configs/constant';
import { getRelativeRootPath } from 'services/appPath';
import { useSetupCtx, getGlobalState } from 'services/concent';
import * as arrUtil from 'utils/arr';
import Logo from './dumb/Logo';
import './resetMenu.css';
import styles from './App.module.css';

const { Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;
const { siderWidthPx } = sys;

function iState() {
  // 获取路由参数，确定展开的菜单
  let path = getRelativeRootPath();
  // 确保home页时左侧菜单能够正确的点亮
  if (path === '/') path = homePageFullPath;

  let openKeys: string[] = [];
  // 当边栏可见时，才计算 openKeys
  if (getGlobalState().siderVisible && path2menuGroup[path]) {
    openKeys = [path2menuGroup[path].key];
  }

  return {
    selectedKeys: [path],
    openKeys,
  };
}

function setup(ctx: CtxDe) {
  const ins = ctx.initState(iState);
  ctx.on(getUrlChangedEvName(), (params) => {
    // 来自于api的调用跳转 &&sider 处于可见状态，才重置菜单点亮状态
    if (params.state?.callByApi && ctx.globalState.siderVisible) {
      const newState = iState();
      // 保持原来的菜单展开状态, 同时也让新的能够正确展开
      newState.openKeys = arrUtil.merge(newState.openKeys, ins.state.openKeys);
      ctx.setState(newState);
    }
  });

  return {
    insState: ins.state,
    changeSelectedKeys: ({ selectedKeys }: SelectInfo) => {
      ins.setState({ selectedKeys: selectedKeys?.map(item => `${item}`) });
    },
    openMenus: (openKeys: React.Key[]) => {
      ins.setState({ openKeys: openKeys?.map(item => `${item}`) });
    },
    renderMenuItem: (menuItem: IMenuItem) => {
      const { Icon, path, label } = menuItem;
      const uiIcon = Icon ? <Icon /> : '';
      return <MenuItem key={path}>
        <Link to={path}>{uiIcon}{label}</Link>
      </MenuItem>;
    },
  };
}

interface ISiderMenusProps {
  mode?: MenuMode;
  style?: React.CSSProperties;
}
export function SiderMenus(props: ISiderMenusProps) {
  const { mode = 'inline', style = { height: '100%', borderRight: 0 } } = props;
  const { settings: se, globalState } = useSetupCtx(setup, { tag: 'Sider' });
  // 垂直在左侧布局时，才读siderTheme，否则主题色应和 headerTheme 相同
  const theme = mode === 'inline' ? globalState.siderTheme : globalState.headerTheme;

  return <Menu
    className="layout-sider"
    theme={theme}
    onSelect={se.changeSelectedKeys}
    onOpenChange={se.openMenus}
    mode={mode}
    selectedKeys={se.insState.selectedKeys}
    openKeys={se.insState.openKeys}
    style={style}
  >
    {showingMenus.map((item) => {
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
  </Menu>;
}

function AppSider() {
  const { globalState } = useSetupCtx(setup, { tag: 'Sider' });
  return (
    <Sider width={siderWidthPx} className={styles.siderWrap} theme={globalState.siderTheme}>
      <Logo fixed={true} />
      <SiderMenus />
    </Sider>
  );
}

export default React.memo(AppSider);
