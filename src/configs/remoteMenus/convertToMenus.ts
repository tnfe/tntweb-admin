import React from 'react';
import * as icons from '@ant-design/icons';
import { iconPool, setIconPoolStyleMap } from 'components/dumb/icons';
import { getCustomizedConfig } from 'configs/appContext';
import { IMenuItem, IMenuGroup } from '../menus';

// 支持用户在 localStorage 设置 'entry.${key}' 形式的 key，来调整路由要载入的子应用
// localStorage的配置会被路由上注入的配置覆盖
function getReplacedAppNames(appGroupNameList: string[]) {
  const { appGroupName2Name } = getCustomizedConfig();
  const map: Record<string, string> = {};
  appGroupNameList.forEach((appGroupName) => {
    const replacedAppName = localStorage.getItem(`entry.${appGroupName}`);
    if (replacedAppName) {
      map[appGroupName] = replacedAppName;
    }
    if (appGroupName2Name[appGroupName]) {
      map[appGroupName] = appGroupName2Name[appGroupName];
    }
  });

  return map;
}

export function getIcon(iconSource: string, iconType: string): React.FunctionComponent<any> {
  if (iconSource === 'xc') {
    return iconPool[iconType];
  }
  // @ts-ignore
  return icons[iconType];
}

function getExtraData(appGroupName2conf: IMenuDataOCT['appGroupName2conf'], routerFullPath: string) {
  const [, appGroupName] = routerFullPath.split('/');
  const conf = { ...(appGroupName2conf[appGroupName] || {}), appGroupName };

  const replacedAppNames = getReplacedAppNames(Object.keys(appGroupName2conf));
  const replacedAppName = replacedAppNames[appGroupName];
  const replacedAppNameConf = replacedAppName ? { appName: replacedAppName } : {};

  // appName 读取顺序(从左往右，依次降低)：replacedAppName ---> conf.appName
  const data = Object.assign(conf, replacedAppNameConf);

  const { hubConfs } = getCustomizedConfig();
  // url 强行指定了是否启用 shadow 渲染子应用
  if (hubConfs.isAppShadowFromUrl) {
    data.allowShadow = hubConfs.appShadow;
  }
  return data;
}

function buildMenuItemUiData(appGroupName2conf: IMenuDataOCT['appGroupName2conf'], childItem: IMenuItemOCT) {
  const {
    authId,
    path,
    label,
    exact,
    iconType,
    iconSource,
    isHomePage,
    setContentLayout,
    showInSider,
    alwayInSiderEvenNoAuth,
    isOutLink = false,
  } = childItem;
  // @ts-ignore
  const Icon = getIcon(iconSource, iconType);
  return {
    // @ts-ignore
    authId,
    Component: React.lazy(() => import('components/SubAppLoader')),
    path,
    label,
    Icon,
    iconType,
    iconSource,
    isHomePage,
    setContentLayout,
    exact,
    showInSider,
    alwayInSiderEvenNoAuth,
    extraData: getExtraData(appGroupName2conf, path),
    isOutLink,
  };
}

/**
 * 转换【普通数据结构的json多层级结构】菜单为项目需要的【含组件的json多层级结构】菜单
 */
export default function convertToMenus(
  plainJsonMenus: Array<IMenuGroupItemOCT | IMenuItemOCT>,
  appGroupName2conf: IMenuDataOCT['appGroupName2conf'],
  iconStyles: Record<string, any>,
) {
  const convertedMenus: Array<IMenuItem | IMenuGroup> = [];
  setIconPoolStyleMap(iconStyles);

  // 收敛类型辅助函数，方便 forEach 里不再需要各种 as 转换
  const typeItem = (item: IMenuGroupItemOCT | IMenuItemOCT) => {
    if (Object.prototype.hasOwnProperty.call(item, 'children')) {
      return { isGroup: true as const, data: item as IMenuGroupItemOCT };
    }
    return { isGroup: false as const, data: item as IMenuItemOCT };
  };

  const path2menuItemUiData: Record<string, ReturnType<typeof buildMenuItemUiData>> = {};

  // 递归遍历原始菜单配置，转换为项目需要格式的菜单配置，菜单的嵌套层级结构依然保持
  const recursiveMenusToExtractMenuItem = (
    originalMenus: Array<IMenuGroupItemOCT | IMenuItemOCT>,
    level: number,
    convertedMenus: Array<IMenuGroup | IMenuItem>,
  ) => {
    originalMenus.forEach((item) => {
      const typedItem = typeItem(item);
      if (typedItem.isGroup) {
        // @ts-ignore
        const { children, key, label, iconType, iconSource, place = 'left' } = typedItem.data;
        const Icon = getIcon(iconSource, iconType);
        const curMenuGroup: IMenuGroup = { key, label, Icon, children: [], place };
        if (level === 4) {
          throw new Error('暂不支持4层结构的菜单配置');
        }
        recursiveMenusToExtractMenuItem(children, level + 1, curMenuGroup.children);
        // 将菜单组放到 menus 里
        convertedMenus.push(curMenuGroup);
      } else {
        // 将菜单做数据格式转换后放到 menus 里
        const menuItemUiData = buildMenuItemUiData(appGroupName2conf, typedItem.data);
        path2menuItemUiData[menuItemUiData.path] = menuItemUiData;
        convertedMenus.push(menuItemUiData);
      }
    });
  };

  recursiveMenusToExtractMenuItem(plainJsonMenus, 1, convertedMenus);

  // 在最后一组路由里，依据所有应用组名构建一个 exact = false 的路由配置，确保命中了子路由名字的路由就能够加载具体的子应用
  // 注意此处一定只能放最后一条，否则会导致前面配置了 authId 的路由权限失效
  const appGroupNames = Object.keys(appGroupName2conf);
  const ensureAppAllRouteMatchMenuGroup: IMenuGroup = { key: '__match_all_app__', label: '', children: [] };
  appGroupNames.forEach((name) => {
    const appEntryPath = `/${name}`;
    const data = path2menuItemUiData[appEntryPath];
    if (!data) {
      ensureAppAllRouteMatchMenuGroup.children.push(
        buildMenuItemUiData(appGroupName2conf, {
          exact: false,
          path: appEntryPath,
          showInSider: false,
          iconSource: 'antd',
          iconType: '',
          label: '',
        }),
      );
    }
  });
  convertedMenus.push(ensureAppAllRouteMatchMenuGroup);

  return convertedMenus;
}
