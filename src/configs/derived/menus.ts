/**
 * 由 configs/menus 派生出的数据
 */
import { isNull } from 'utils/obj';
import { IMenuGroup, IMenuItem } from '../menus';

// 打平菜单为一层的结构
function flatMenus(menus: Array<IMenuItem | IMenuGroup>) {
  const flatted = [] as IMenuItem[];

  const pushToFlatted = (item: IMenuItem) => {
    flatted.push(item);
  };

  menus.forEach((item) => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      groupItem.children.forEach((groupOrItem) => {
        if ('children' in groupOrItem && groupOrItem.children) {
          // 此时 group 项是一个 IMenuGroup
          groupOrItem.children.forEach((item) => pushToFlatted(item as IMenuItem));
          return;
        }
        // 此时 group 项是一个 IMenuItem
        pushToFlatted(groupOrItem as IMenuItem);
      });
      return;
    }
    const menuItem = item as IMenuItem;
    pushToFlatted(menuItem);
  });
  return flatted;
}

// 提前计算好 menus 的相关映射关系，或者其他目标参数，以及填充true默认值(方便其他地方使用时能够拥有正确的默认值)
function calcMenus(menus: Array<IMenuItem | IMenuGroup>) {
  let homePageFullPath = '';
  const getFilledMenuItem = (item: IMenuItem): IMenuItem => {
    const {
      path,
      showInSider = true,
      alwayInSiderEvenNoAuth = false,
      isOutLink = false,
      setContentLayout = true,
      exact = false,
      isHomePage = false,
      place = 'left',
      ...rest
    } = item;
    return {
      ...rest,
      place,
      isOutLink,
      isHomePage,
      exact,
      path,
      showInSider,
      alwayInSiderEvenNoAuth,
      setContentLayout,
    };
  };

  menus.forEach((item) => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      const { children, place = 'left', ...rest } = groupItem;
      const showingMenuGroup: IMenuGroup = { ...rest, place, children: [] };
      const allMenuGroup: IMenuGroup = { ...rest, place, children: [] };

      children.forEach((childItem) => {
        const fillDefaultValChildItem = getFilledMenuItem(childItem as IMenuItem);
        // 三级菜单处理
        if ('children' in childItem && childItem.children) {
          const childItemInfo = childItem as IMenuGroup;
          const showingMenuSubGroup: IMenuGroup = {
            key: childItemInfo.key,
            label: childItemInfo.label,
            Icon: childItemInfo.Icon,
            children: [],
          };
          const allMenuSubGroup: IMenuGroup = {
            key: childItemInfo.key,
            label: childItemInfo.label,
            Icon: childItemInfo.Icon,
            children: [],
          };
          childItemInfo.children.forEach((item) => {
            const fillDefaultValSubChildItem = getFilledMenuItem(item as IMenuItem);
            const { path, showInSider } = fillDefaultValSubChildItem;

            allMenuSubGroup.children.push(fillDefaultValSubChildItem);
            path2menuGroup[path] = allMenuSubGroup;
            path2menuItem[path] = fillDefaultValSubChildItem;
            if (showInSider) {
              showingMenuSubGroup.children.push(fillDefaultValSubChildItem);
            }
          });
          showingMenuGroup.children.push(showingMenuSubGroup);
          allMenuGroup.children.push(allMenuSubGroup);

          return;
        }

        const { path, isHomePage, showInSider } = fillDefaultValChildItem;
        allMenuGroup.children.push(fillDefaultValChildItem);

        path2menuGroup[path] = allMenuGroup;
        path2menuItem[path] = fillDefaultValChildItem;
        if (isHomePage) {
          homePageFullPath = path;
          path2menuGroup['/'] = groupItem;
          path2menuItem['/'] = fillDefaultValChildItem;
        }
        if (showInSider) {
          showingMenuGroup.children.push(fillDefaultValChildItem);
        }
      });
      siderMenus.push(showingMenuGroup);
      allMenus.push(allMenuGroup);
      return;
    }

    const menuItem = item as IMenuItem;
    const fillDefaultValMenuItem = getFilledMenuItem(menuItem);
    const { path, isHomePage, showInSider } = fillDefaultValMenuItem;
    path2menuItem[path] = fillDefaultValMenuItem;
    if (isHomePage) {
      homePageFullPath = path;
      path2menuItem['/'] = fillDefaultValMenuItem;
    }
    if (showInSider) {
      siderMenus.push(fillDefaultValMenuItem);
    }
    allMenus.push(fillDefaultValMenuItem);
  });
  return { path2menuGroup, path2menuItem, homePageFullPath, siderMenus, allMenus };
}

let homePageFullPath = '';
let path2menuItem: Record<string, IMenuItem> = {};
let path2menuGroup: Record<string, IMenuGroup> = {};
// 原始的带有层级结构的菜单数据
let allMenus: Array<IMenuItem | IMenuGroup> = [];
/**
 * 匹配 showInSider 为 true 后的带有层级结构的菜单数据
 * 注：指向的item数据已正确填充了各种默认值
 */
let siderMenus: Array<IMenuItem | IMenuGroup> = [];
// 最终结合 authIds,alwayInSiderEvenNoAuth 计算出的可展现在边栏里的带有层级结构的菜单数据
const visibleSiderMenus: Array<IMenuItem | IMenuGroup> = [];
const visibleSiderMenusOfLeft: Array<IMenuItem | IMenuGroup> = [];
const visibleSiderMenusOfTop: Array<IMenuItem | IMenuGroup> = [];
// 打平后的菜单，方便构造路由组件
let flattedMenus: Array<IMenuItem> = [];
// 来自于配置中心的 app 组名和对应配置的映射 map
let appGroupName2conf: IMenuDataOCT['appGroupName2conf'] = {};

export function setAppGroupNameConfMap(map: IMenuDataOCT['appGroupName2conf']) {
  appGroupName2conf = map;
}

export function calcMenuData(menus: Array<IMenuItem | IMenuGroup>) {
  const ret = calcMenus(menus);
  path2menuItem = ret.path2menuItem;
  path2menuGroup = ret.path2menuGroup;
  siderMenus = ret.siderMenus;
  allMenus = ret.allMenus;
  homePageFullPath = ret.homePageFullPath;
  flattedMenus = flatMenus(allMenus);
}

/**
 * 计算出用户最终可见的边栏菜单
 * @param authIds
 */
export function calcVisibleSiderMenus(authIds: Array<string | number>) {
  const canBeVisible = (item: IMenuItem) => {
    // 配置了 showInSider 为true，则需结合权限进一步判断是否能展现
    if (item.showInSider) {
      const visible = isNull(item.authId) || (!!item.authId && authIds.includes(item.authId));
      if (!visible && item.alwayInSiderEvenNoAuth) {
        return true;
      }
      return visible;
    }
    // 配置为 false，一定不能展现
    return false;
  };
  const pushToVisibleSiderMenus = (item: IMenuGroup | IMenuItem) => {
    visibleSiderMenus.push(item);
    if (item.place === 'top') {
      visibleSiderMenusOfTop.push(item);
    } else if (item.place === 'left') {
      visibleSiderMenusOfLeft.push(item);
    }
  };

  siderMenus.forEach((item) => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      const { children, ...rest } = groupItem;
      const visibleMenuGroup: IMenuGroup = { ...rest, children: [] };

      children.forEach((childItem) => {
        if ('children' in childItem && childItem.children && childItem.children.length > 0) {
          const childItemInfo = childItem as IMenuGroup;
          const { children: subChild, key, Icon, label } = childItemInfo;
          const visibleChildMenuGroup: IMenuGroup = { key, Icon, label, children: [] };
          subChild?.forEach((subChildItem) => {
            if (canBeVisible(subChildItem as IMenuItem)) {
              visibleChildMenuGroup.children.push(subChildItem);
            }
          });
          if (visibleChildMenuGroup.children.length > 0) {
            // @ts-ignore
            visibleMenuGroup.children.push(visibleChildMenuGroup);
          }
          return;
        }
        if (canBeVisible(childItem as IMenuItem)) {
          visibleMenuGroup.children.push(childItem);
        }
      });

      if (visibleMenuGroup.children.length > 0) {
        pushToVisibleSiderMenus(visibleMenuGroup);
      }
      return;
    }

    const menuItem = item as IMenuItem;
    if (canBeVisible(menuItem)) {
      pushToVisibleSiderMenus(menuItem);
    }
  });
}

export function getMenuData() {
  return {
    path2menuGroup,
    path2menuItem,
    homePageFullPath,
    allMenus,
    siderMenus,
    visibleSiderMenus,
    visibleSiderMenusOfLeft,
    visibleSiderMenusOfTop,
    flattedMenus,
    appGroupName2conf,
  };
}

export function getPathLabel(path: string, defaultVal?: string) {
  const item = path2menuItem[path];
  if (item) {
    return item.label;
  }

  return defaultVal || path;
}
