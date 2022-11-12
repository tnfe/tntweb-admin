import { safeParse } from 'utils/obj';

// @ts-ignore
let cachedHubConfig: IHubConfig = {};

/**
 * @returns
 */
export async function initHubConfig() {
  // @ts-ignore
  let hubConfig: IHubConfig = {};

  if (window.__HUB_CONFIG__) { // 线上环境运行时，后台下发的首页已注入
    hubConfig = window.__HUB_CONFIG__;
  } else { // 本地 dev-server 开发，去请求一下
    // TODO 实现请求 hubConfig
    hubConfig = {
      iconAssetsUrl: '',
      menuData: {
        appGroupName2conf: {},
        menus: []
      },
      iconStyles: {},
    };

    window.__HUB_CONFIG__ = hubConfig;
  }

  if (!hubConfig.confVer) {
    hubConfig.confVer = {};
  } else if (typeof hubConfig.confVer === 'string') {
    hubConfig.confVer = safeParse(hubConfig.confVer, {});
  }

  // 顶部菜单的隐藏配置
  if (!hubConfig.topMenuHidden) {
    hubConfig.topMenuHidden = {};
  } else if (typeof hubConfig.topMenuHidden === 'string') {
    hubConfig.topMenuHidden = safeParse(hubConfig.topMenuHidden, {});
  }

  cachedHubConfig = hubConfig;
  return hubConfig;
}

export function getHubConfig() {
  return cachedHubConfig;
}
