/**
 * 基座app才需要执行此逻辑，动态的确定边栏导航模样
 */
import { calcMenuData, setAppGroupNameConfMap, calcVisibleSiderMenus } from '../derived/menus';
import menus from '../menus';
import { getHubConfig } from 'services/confCenter';
import convertToMenus from './convertToMenus';

export default function (authIds: Array<string | number>) {
  const { iconStyles, menuData } = getHubConfig();
  const remoteMenus = convertToMenus(menuData.menus, menuData.appGroupName2conf || {}, iconStyles);
  setAppGroupNameConfMap(menuData.appGroupName2conf || {});
  calcMenuData([...remoteMenus, ...menus]);
  calcVisibleSiderMenus(authIds);
}
