
import { SiderTheme } from 'antd/lib/layout/Sider';
import { IMenuGroup, IMenuItem } from 'configs/menus';
import { topViewTypes } from 'configs/constant/sys';
import * as colorServ from 'services/color';
import * as commonUtil from 'utils/common';

function getInitialState() {
  const themeColor = '#4a90e2';
  const themeColorRGB = colorServ.hex2rgbString(themeColor);

  return {
    activeRoutePaths: [] as string[],
    curActiveRoutePath: '',
    navMenus: [] as Array<IMenuGroup | IMenuItem>,
    topViewType: topViewTypes.FIXED_HEADER_FIXED_BAR,

    settingDrawerVisible: false,
    siderVisible: true,
    siderTheme: 'dark' as SiderTheme,
    headerTheme: 'dark' as SiderTheme,
    /** 站点的主题颜色 */
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
}

export type St = ReturnType<typeof getInitialState>;

export default getInitialState;
