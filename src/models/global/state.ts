
import { SiderTheme } from 'antd/lib/layout/Sider';
import { topViewTypes, LS_C2PRO_SETTINGS } from 'configs/constant/sys';
import { path2menuItem } from 'configs/derived/menus';
import * as colorServ from 'services/color';
import * as commonUtil from 'utils/common';
import { safeParse } from 'utils/obj';
import { removeDupStrItem } from 'utils/arr';

function getInitialState() {
  const themeColor = '#4a90e2';
  const themeColorRGB = colorServ.hex2rgbString(themeColor);

  const defaultState = {
    activeRoutePaths: [] as string[],
    curActiveRoutePath: '',
    topViewType: topViewTypes.FIXED_HEADER_FIXED_BAR,
    /** 常用设置抽屉是否可见 */
    settingDrawerVisible: false,
    siderVisible: true,
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
  let validActiveRoutePaths = activeRoutePaths.slice();
  activeRoutePaths.forEach(path => {
    if (!path2menuItem[path]) {
      validActiveRoutePaths = removeDupStrItem(validActiveRoutePaths, [path]);
    }
  });
  final.activeRoutePaths = validActiveRoutePaths;

  return final;
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
