/*
|--------------------------------------------------------------------------
|
| 基座加载时，做的一些清理工作，存储一些状态等，都在 appContext 里完成
|
|--------------------------------------------------------------------------
*/

const appGroupName2Name: Record<string, string> = {};
const appName2Version: Record<string, string> = {};
const appName2devUrl: Record<string, string> = {};

const hubConfs = {
  /** 升到antd18后默认关闭 shadow，否则折叠菜单有问题 */
  siderShadow: false,
  appShadow: false,
  isAppShadowFromUrl: false,
};
// 火狐浏览器默认关闭边栏shadow-dom包裹功能
if (window.navigator.userAgent.includes('Firefox')) {
  hubConfs.siderShadow = false;
}

/**
 * 提取路由search参数，存储起来
 */
export function extractCustomizedConfig() {
  //  尝试解析url上的app、版本映射关系
  let searchStr = window.location.search;
  if (searchStr.startsWith('?')) {
    searchStr = searchStr.substring(1);
    const items = searchStr.split('&');

    items.forEach((item) => {
      // 解析 appmap=a:b,c:d|d_xx_version,
      const [, value] = item.split('=');
      if (item.includes('appmap=')) {
        const groupName2NamePairs = value.split(',');
        groupName2NamePairs.forEach((pair) => {
          const [appGroupName, appName] = pair.split(':');
          if (appName.includes('|')) {
            const [targetAppName, targetAppVersion] = appName.split('|');
            appGroupName2Name[appGroupName] = targetAppName;
            appName2Version[targetAppName] = targetAppVersion;
          } else {
            appGroupName2Name[appGroupName] = appName;
          }
        });
      }
      if (item.includes('appdev=')) {
        const [name, devUrl] = value.split('|');
        appName2devUrl[name] = devUrl;
      }
      if (item.includes('sidershadow=')) {
        hubConfs.siderShadow = value === '1';
      }
      if (item.includes('appshadow=')) {
        hubConfs.appShadow = value === '1';
        hubConfs.isAppShadowFromUrl = true;
      }
    });
  }
}

export function getCustomizedConfig() {
  return {
    appGroupName2Name, appName2Version, appName2devUrl, hubConfs,
  };
}
