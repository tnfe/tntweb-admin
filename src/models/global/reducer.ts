import { VoidPayload } from 'concent';
import { siteThemeColor, siderViewTypes } from 'configs/constant/sys';
import { path2menuItem } from 'configs/derived/menus';
import * as colorServ from 'services/color';
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
  const { activeRoutePaths, curActiveRoutePath } = moduleState;
  const toSet: Partial<St> = {};

  // 如果需要带参路由也点亮页签的话，可以去掉下面这个if判断逻辑
  if (search) { return toSet; }

  if (!path2menuItem[path]) return toSet;
  const targetPathInfo = activeRoutePaths.find(v => v.path === path);
  if (!targetPathInfo) {
    // 最多激活5个
    if (activeRoutePaths.length <= 8) {
      activeRoutePaths.push({ path, search });
    } else {
      // 否则替换掉第一个
      activeRoutePaths[0] = { path, search };
    }
    toSet.activeRoutePaths = activeRoutePaths;
  } else {
    if (targetPathInfo.search !== search) {
      targetPathInfo.search = search;
    }
  }

  if (curActiveRoutePath !== path) {
    toSet.curActiveRoutePath = path;
  }
  return toSet;
}

/**
 * 删除页签
 */
export function delActiveRoutePath(path: string, moduleState: St) {
  const { activeRoutePaths } = moduleState;

  const targetRoutePath = activeRoutePaths.find(v => v.path === path);
  let curActiveRoutePath = '/';
  if (targetRoutePath) {
    const idx = activeRoutePaths.findIndex(v => v.path === path);
    const toDelPath = targetRoutePath.path;
    activeRoutePaths.splice(idx, 1);
    // 如果删除的就是当前激活的path
    if (toDelPath === moduleState.curActiveRoutePath) {
      // 替换为第一个
      if (activeRoutePaths.length >= 1) {
        const [firstPath] = activeRoutePaths;
        curActiveRoutePath = firstPath.path;
      }
    } else {
      curActiveRoutePath = moduleState.curActiveRoutePath;
    }

    const newPath = activeRoutePaths.find(v => v.path === curActiveRoutePath);
    return { activeRoutePaths, curActiveRoutePath, search: newPath?.search || '' };
  }
  return { curActiveRoutePath, search: '' };
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
  return { fontAlpha }
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
