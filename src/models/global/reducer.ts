import { VoidPayload } from 'concent';
import { siteThemeColor, siderViewTypes } from 'configs/constant/sys';
import { path2menuItem } from 'configs/derived/menus';
import * as colorServ from 'services/color';
import { getSearchPath } from 'services/appPath';
import { St, IAC } from './meta';

const { NARROW_SIDER, WIDE_SIDER, NO_SIDER } = siderViewTypes;

export function toggleCollapsedBtn(payload: VoidPayload, moduleState: St) {
  const { siderViewType } = moduleState;
  if (siderViewType === NARROW_SIDER) {
    return { siderViewType: WIDE_SIDER, siderViewTypeWhenUnfold: WIDE_SIDER };
  }
  return { siderViewType: NARROW_SIDER, siderViewTypeWhenUnfold: NARROW_SIDER, siderViewToNarrowTime: Date.now() };
}

export async function changeIsUsingDefaultTheme(checked: boolean, moduleState: St, ac: IAC) {
  await ac.setState({ isUsingDefaultThemeColor: checked });
  await ac.dispatch(changeThemeColor, { themeColor: siteThemeColor });
}

/**
 * 添加一个激活的页签
 */
export function addActiveRoutePath(payload: { path: string, search?: string }, moduleState: St) {
  const { path, search = '' } = payload;
  const newFullPath = getSearchPath(path, search);
  const { activeRoutePaths, curActiveRouteFullPath } = moduleState;
  if (newFullPath === curActiveRouteFullPath) return {};

  const toSet: Partial<St> = { curActiveRouteFullPath: newFullPath, curActiveRoutePath: path };

  // 打开下面逻辑：带search参数路由不写标签页
  // if (search) { return toSet; }

  const menuItem = path2menuItem[path];
  if (!menuItem) { return toSet; }

  // 打开下面逻辑：不显示在边栏菜单里的路由组件不写标签页
  // if (!menuItem.showInSider) { return toSet; }

  const targetPathInfo = activeRoutePaths.find(v => v.path === path && v.search === search);
  if (!targetPathInfo) {
    // 最多激活8个
    if (activeRoutePaths.length <= 8) {
      activeRoutePaths.push({ path, search });
    } else {
      // 否则替换掉第一个
      activeRoutePaths[0] = { path, search };
    }
    toSet.activeRoutePaths = activeRoutePaths;
  }

  return toSet;
}

/**
 * 删除页签
 */
export function delActiveRoutePath(payload: { path: string, search: string }, moduleState: St) {
  const { path, search } = payload;
  const { activeRoutePaths } = moduleState;

  const targetRoutePath = activeRoutePaths.find(v => v.path === path && v.search === search);
  let curActiveRoutePath = '/';
  let curActiveRouteFullPath = curActiveRoutePath;
  if (targetRoutePath) {
    const idx = activeRoutePaths.findIndex(v => v.path === path && v.search === search);
    const toDelPath = targetRoutePath.path;
    activeRoutePaths.splice(idx, 1);
    // 如果删除的就是当前激活的path
    if (toDelPath === moduleState.curActiveRoutePath) {
      // 替换为第一个
      if (activeRoutePaths.length >= 1) {
        const [firstPath] = activeRoutePaths;
        curActiveRoutePath = firstPath.path;
        curActiveRouteFullPath = getSearchPath(firstPath.path, firstPath.search);
      }
    } else {
      curActiveRoutePath = moduleState.curActiveRoutePath;
      curActiveRouteFullPath = moduleState.curActiveRouteFullPath;
    }

    return { activeRoutePaths, curActiveRoutePath, curActiveRouteFullPath };
  }
  return { curActiveRoutePath, curActiveRouteFullPath };
}

export function changeTopViewType(topViewType: string): Partial<St> {
  return { topViewType };
}

export function toggleSiderVisible(p: any, moduleState: St): Partial<St> {
  const { siderViewType, siderViewTypeWhenUnfold } = moduleState;
  if (siderViewType === siderViewTypes.NO_SIDER) {
    const toSet: Partial<St> = { siderViewType: siderViewTypeWhenUnfold };
    if (siderViewTypeWhenUnfold === NARROW_SIDER) toSet.siderViewToNarrowTime = Date.now();
    return toSet;
  }
  return { siderViewType: NO_SIDER };
}

export function changeThemeColor(payload: { themeColor: string, setCustThemeColor?: boolean }): Partial<St> {
  const { themeColor, setCustThemeColor } = payload;
  colorServ.changeThemeColor(themeColor);
  // 修改浅色
  const themeColorLight = colorServ.getThemeColorLight(themeColor);
  colorServ.changeThemeColorLight(themeColorLight);
  // 修改主题色rgb值
  const themeColorRGB = colorServ.hex2rgbString(themeColor);
  colorServ.changeThemeColorRGB(themeColorRGB);

  const toSet: Partial<St> = { themeColor, themeColorLight, themeColorRGB };
  if (setCustThemeColor) {
    toSet.custThemeColor = themeColor;
    toSet.isUsingDefaultThemeColor = false;
  }
  return toSet;
}

export function changeFontAlpha(fontAlpha: number): Partial<St> {
  colorServ.changeFontAlpha(fontAlpha);
  return { fontAlpha };
}

export function changeIsTabPaneHeavyBg(isTabPaneHeavyBg: boolean): Partial<St> {
  return { isTabPaneHeavyBg };
}

export function switchSiderTheme(checked: boolean, moduleState: St): Partial<St> {
  return { siderTheme: checked ? 'dark' : 'light' };
}

export function switchHeaderTheme(checked: boolean, moduleState: St): Partial<St> {
  return { headerTheme: checked ? 'dark' : 'light' };
}

export function changeIsInnerMock(checked: boolean, moduleState: St): Partial<St> {
  return { isInnerMock: checked };
}

export async function prepareApp(): Promise<Partial<St>> {
  // 模拟接口自动登录
  const info = await Promise.resolve({ user: 'hi concent pro', icon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3662109890,1098716941&fm=15&gp=0.jpg', isAdmin: true })

  return { userName: info.user, userIcon: info.icon, isAdmin: info.isAdmin, isAppReady: true };
}
