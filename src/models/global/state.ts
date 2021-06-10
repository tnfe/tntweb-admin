
import { SiderTheme } from 'antd/lib/layout/Sider';
import { topViewTypes, topViewType2Label, siderViewTypes, LS_C2PRO_SETTINGS, siteThemeColor } from 'configs/constant/sys';
import { path2menuItem } from 'configs/derived/menus';
import * as colorServ from 'services/color';
import * as commonUtil from 'utils/common';
import { safeParse } from 'utils/obj';
import { removeTargetItem } from 'utils/arr';
interface IRoutePathInfo {
  path: string;
  search: string;
}

function getInitialState() {
  const themeColor = siteThemeColor;
  const themeColorRGB = colorServ.hex2rgbString(themeColor);

  const defaultState = {
    activeRoutePaths: [] as IRoutePathInfo[],
    curActiveRoutePath: '',
    /** 站点的字体色值透明度，值越大，字体颜色越深 */
    fontAlpha: 75,
    topViewType: topViewTypes.FIXED_HEADER_FIXED_BAR,
    siderViewType: siderViewTypes.WIDE_SIDER,
    siderViewToNarrowTime: 0,
    /** 当sider从无到有时，用于还原原来的折叠情况 */
    siderViewTypeWhenUnfold: siderViewTypes.WIDE_SIDER,
    /** 常用设置抽屉是否可见 */
    settingDrawerVisible: false,
    siderTheme: 'dark' as SiderTheme,
    headerTheme: 'dark' as SiderTheme,
    isUsingDefaultThemeColor: true,
    /** 个性化设置的站点的主题颜色 */
    custThemeColor: themeColor,
    /** 使用中的站点主题颜色 */
    themeColor,
    themeColorRGB,
    themeColorLight: colorServ.getThemeColorLight(themeColor),
    someInfo: 'overWrite built-in module global\'s state',

    /** 系统是否准备就绪，包括登录、配置数据拉取等动作完成才是就绪 */
    isAppReady: false,
    userName: '',
    userIcon: '',
    /** 当前登录者是否是管理员 */
    isAdmin: false,
    /** 当前用户拥有的权限列表 */
    authIds: [] as string[],
    /** 处于innerMock时，httpService的请求结果会直接从模拟文件获取（同时还会配合 excludedMockApis 名单），注意此时不会从浏览器发出请求 */
    isInnerMock: commonUtil.isLocalMode(),
    /** isInnerMock 为 true 时，只要实现了的mock函数，如果没有在 excludedMockApis 名单里， 都会去被调用 */
    excludedMockApis: [
    ] as string[],
  };

  // 还原用户最近一次设置数据
  const cachedSettings = safeParse(localStorage.getItem(LS_C2PRO_SETTINGS) || '', defaultState);
  const final = { ...defaultState, ...cachedSettings };
  const { activeRoutePaths } = final;

  // 确保path数据是正确的
  try {
    const validActiveRoutePaths: IRoutePathInfo[] = [];
    activeRoutePaths.forEach((v) => {
      if (!v || typeof v !== 'object') return;
      if (v.path && path2menuItem[v.path]) {
        validActiveRoutePaths.push(v);
      }
    });
    final.activeRoutePaths = validActiveRoutePaths;
  } catch (err) {
    final.activeRoutePaths = [];
  }

  // 未使用默认默认主题色，需要修改 isUsingDefaultThemeColor 为 false
  if (final.themeColor !== siteThemeColor) final.isUsingDefaultThemeColor = false;
  // 修正可能错误的 topViewType 值
  if (!topViewType2Label[final.topViewType] || typeof final.topViewType !== 'string') {
    final.topViewType = topViewTypes.NO_HEADER_FIXED_BAR;
  }


  return final;
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
