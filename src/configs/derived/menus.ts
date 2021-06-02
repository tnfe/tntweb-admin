
/**
 * 由 configs/menus 派生出的数据
 */
import menus, { IMenuGroup, IMenuItem } from '../menus';

// 打平菜单为一层的结构
function flatMenus() {
  const flatted = [] as IMenuItem[];

  const pushToFlatted = (item: IMenuItem) => {
    flatted.push(item);
  };

  menus.forEach((item) => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      groupItem.children.forEach(pushToFlatted);
      return;
    }
    const menuItem = item as IMenuItem;
    pushToFlatted(menuItem);
  });

  return flatted;
}

// 提前计算好 menus 的相关映射关系，或者其他目标参数
function calcMenus() {
  const path2menuItem: Record<string, IMenuItem> = {};
  const path2menuGroup: Record<string, IMenuGroup> = {};
  // 保持层级结构的可展现的菜单，翻遍垂直或水平模式下不用判断showInSider条件，直接渲染
  // 因为水平下判断 showInSider 为false，返回无效节点会导致antd菜单组件报错
  const showingMenus: Array<IMenuItem | IMenuGroup> = [];
  let homePageFullPath = '';

  menus.forEach(item => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      const { children, ...rest } = groupItem;
      const showingMenuGroup: IMenuGroup = { ...rest, children: [] };
      children.forEach((childItem) => {
        const { path, showInSider = true } = childItem;
        path2menuGroup[path] = groupItem;
        path2menuItem[path] = childItem;
        if (childItem.isHomePage) {
          homePageFullPath = path;
          path2menuGroup['/'] = groupItem;
          path2menuItem['/'] = childItem;
        }
        if (showInSider) {
          showingMenuGroup.children.push(childItem);
        }
      });
      showingMenus.push(showingMenuGroup);
      return;
    }

    const menuItem = item as IMenuItem;
    path2menuItem[menuItem.path] = menuItem;
    if (menuItem.isHomePage) {
      path2menuItem['/'] = menuItem;
      homePageFullPath = menuItem.path;
    }
    if (menuItem.showInSider) {
      showingMenus.push(menuItem);
    }
  });
  return { path2menuGroup, path2menuItem, homePageFullPath, showingMenus };
}

const ret = calcMenus();

export const { path2menuGroup } = ret;

export const { path2menuItem } = ret;

export const { homePageFullPath } = ret;

export const { showingMenus } = ret;

export const flattedMenus = flatMenus();
