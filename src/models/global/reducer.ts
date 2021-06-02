import { St } from './meta';
import * as colorServ from 'services/color';

export function toggleSiderVisible(p: any, moduleState: St): Partial<St> {
  return { siderVisible: !moduleState.siderVisible }
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

export function switchFixHeader(checked: boolean, moduleState: St): Partial<St> {
  return { fixHeader: checked };
}

export function changeIsInnerMock(checked: boolean, moduleState: St): Partial<St> {
  return { isInnerMock: checked };
}

export async function prepareApp(): Promise<Partial<St>> {
  // 模拟接口自动登录
  const info = await Promise.resolve({ user: 'hi concent pro', icon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3662109890,1098716941&fm=15&gp=0.jpg', isAdmin: true })

  return { userName: info.user, userIcon: info.icon, isAdmin: info.isAdmin, isAppReady: true };
}
