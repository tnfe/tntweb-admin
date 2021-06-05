import { St } from './meta';
import * as colorServ from 'services/color';

/**
 * 添加一个激活的页签
 */
export function addActiveRoutePath(path: string, moduleState: St) {
  const { activeRoutePaths, curActiveRoutePath } = moduleState;
  const toSet: Partial<St> = {};
  if (!activeRoutePaths.includes(path)) {
    // 最多激活5个
    if (activeRoutePaths.length <= 5) {
      activeRoutePaths.push(path);
    } else {
      // 否则替换掉第一个
      activeRoutePaths[0] = path;
    }
    toSet.activeRoutePaths = activeRoutePaths;
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
  const idx = activeRoutePaths.indexOf(path);
  let curActiveRoutePath = '/';
  if (idx >= 0) {
    const toDelPath = activeRoutePaths[idx];
    activeRoutePaths.splice(idx, 1);
    // 如果删除的就是当前激活的path
    if (toDelPath === moduleState.curActiveRoutePath) {
      // 替换为第一个
      if (activeRoutePaths.length >= 1) curActiveRoutePath = activeRoutePaths[0];
    } else {
      curActiveRoutePath = moduleState.curActiveRoutePath;
    }
    return { activeRoutePaths, curActiveRoutePath };
  }
  return { curActiveRoutePath };
}

export function toggleSiderVisible(p: any, moduleState: St): Partial<St> {
  return { siderVisible: !moduleState.siderVisible }
}

export function changeTopViewType(topViewType: number): Partial<St> {
  return { topViewType };
}

export function changeThemeColor(themeColor: string): Partial<St> {
  colorServ.changeThemeColor(themeColor);
  // 修改浅色
  const themeColorLight = colorServ.getThemeColorLight(themeColor);
  colorServ.changeThemeColorLight(themeColorLight);
  // 修改主题色rgb值
  const themeColorRGB = colorServ.hex2rgbString(themeColor);
  colorServ.changeThemeColorRGB(themeColorRGB);
  return { themeColor, themeColorLight: themeColorLight, themeColorRGB }
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
