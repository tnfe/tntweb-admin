import { VoidPayload } from 'concent';
import { siteThemeColor, SiderViewTypes, LoginStatus } from 'configs/constant/sys';
import { path2menuItem } from 'configs/derived/menus';
import { delay } from 'utils/timer';
import * as colorServ from 'services/color';
import { getSearchPath } from 'services/appPath';
import * as msgServ from 'services/message';
import { St, IAC } from './meta';

const { COLLAPSED, NOT_COLLAPSED, HIDDEN } = SiderViewTypes;
type PSt = Partial<St>;
const fakeLoginData = {
  userName: 'hi concent pro',
  userIcon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3662109890,1098716941&fm=15&gp=0.jpg',
  isAdmin: true,
  token: 'xxxyyy',
  isLogin: true,
}

export function toggleCollapsedBtn(payload: VoidPayload, moduleState: St) {
  const { siderViewType } = moduleState;
  if (siderViewType === COLLAPSED) {
    return { siderViewType: NOT_COLLAPSED, siderViewTypeBackup: NOT_COLLAPSED };
  }
  return { siderViewType: COLLAPSED, siderViewTypeBackup: COLLAPSED, siderViewToCollapsedTime: Date.now() };
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

export function toggleSiderVisible(p: any, moduleState: St): PSt {
  const { siderViewType, siderViewTypeBackup } = moduleState;
  if (siderViewType === HIDDEN) {
    const toSet: PSt = { siderViewType: siderViewTypeBackup };
    if (siderViewTypeBackup === COLLAPSED) toSet.siderViewToCollapsedTime = Date.now();
    return toSet;
  }
  return { siderViewType: HIDDEN };
}

/**
 * 修改边栏视图模式，为了让 toggle 按钮按预期工作，需记录前一刻展开时的视图模式，
 */
export function changeSiderViewType(siderViewType: SiderViewTypes, moduleState: St): PSt {
  const toSet: Partial<St> = { siderViewType };
  if (siderViewType === SiderViewTypes.HIDDEN) {
    toSet.siderViewTypeBackup = moduleState.siderViewType;
  }
  return toSet;
}

export function changeThemeColor(payload: { themeColor: string, setCustThemeColor?: boolean }): PSt {
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

export function changeFontAlpha(fontAlpha: number): PSt {
  colorServ.changeFontAlpha(fontAlpha);
  return { fontAlpha };
}

export function changeIsTabPaneHeavyBg(isTabPaneHeavyBg: boolean): PSt {
  return { isTabPaneHeavyBg };
}

export function switchSiderTheme(checked: boolean, moduleState: St): PSt {
  return { siderTheme: checked ? 'dark' : 'light' };
}

export function switchHeaderTheme(checked: boolean): PSt {
  return { headerTheme: checked ? 'dark' : 'light' };
}

export function changeIsInnerMock(checked: boolean): PSt {
  return { isInnerMock: checked };
}


export async function loginByCookie(payload: VoidPayload, moduleState: St, ac: IAC): Promise<PSt> {
  await ac.setState({ loginStatus: LoginStatus.LOGGING });
  await delay(300);

  // 需自己实现使用站点的cookie或者token去验证登录信息，这里仅模拟接口自动登录
  const loginDeadline = parseInt(localStorage.getItem('C2_loginDeadline') || '0');
  if (Date.now() - loginDeadline < 24 * 60 * 60 * 1000) {
    const loginData = await Promise.resolve(fakeLoginData);
    const toSet: PSt = { ...loginData, isAppReady: true, loginStatus: LoginStatus.LOGIN_SUCCESS };
    return toSet;
  }
  // todo 写 authId 到 state里
  // toSet.authIds = await someService.fetchAuthIds();

  return { loginStatus: LoginStatus.LOGIN_FAILED };
}

/**
 * 账密登录，此处仅模拟，真实逻辑需用户根据自己的实际情况去做具体实现
 * 这里的流程是 账密登录后后端写入最新的cookie，然后执行 loginByCookie 逻辑
 */
export async function loginByPassword(payload: { name: string, pwd: string }, moduleState: St, ac: IAC) {
  await ac.setState({ loginBtnLoading: true });
  await delay(300);
  // 模拟账密登录
  if (payload.name !== 'concent' || payload.pwd !== 'pro') {
    msgServ.warn('账号密码错误，输入账号 concent，密码 pro ，即可登录');
    return { loginBtnLoading: false, loginStatus: LoginStatus.LOGIN_FAILED };
  }
  // 站点写入cookie凭证后，执行
  localStorage.setItem('C2_loginDeadline', String(Date.now()));
  await ac.dispatch(loginByCookie);
}

export function logout(): PSt {
  localStorage.setItem('C2_loginDeadline', '0');
  return { loginStatus: LoginStatus.LOGIN_FAILED, loginBtnLoading: false };
}
