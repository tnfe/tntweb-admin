
/**
 * 声明window里用户新增的属性，让ts编译通过
 *
 * OCT: of conf center
 *
 */

declare global {
  interface Window {
    _isPub: boolean;
    [key: string]: any;
  }

  type IconSource = 'xc' | 'antd';
  interface IMenuItemOCT {
    authId?: string | number;
    /**
     * icon来源，目前支持 'xc' 和 'antd'，'xc'指向的是我们自己在`iconfont`上维护的资源，
     * 'antd'指的是'antd4' ui库的资源
     */
    iconSource?: IconSource;
    /**
     * icon 类型，需注意配和 iconSource 使用
     */
    iconType: string;
    /**
     * 菜单文案
     */
    label: string;
    /**
     * 路由路径信息，如`/xxx-page`、`/xxx-page/xxx-mod`，在多个菜单项有共同的一个一级路径名`xxx-page`时
     * 表示他们对应的是同一个子应用里的不同功能
     */
    path: string;
    /**
     * default：false
     * 当一级路由菜单配置了权限id时，一级路由菜单配置此项才起作用，权限是否影响其他未配置菜单的路由页面
     * 例如 /xxxx 配置了 authId:1, 当命中 /xxx/{path} 时，且 /xxxx/{path} 没有对应的菜单配置时
     * isAuthEffectSamePath = true，则 /xxx 配置的权限会影响是否能看到  /xxxx/{path} 页面
     * isAuthEffectSamePath = false，则 /xxx 配置的权限不影响是否能看到 /xxxx/{path} 页面
     */
    isAuthEffect?: boolean;
    /** 默认值：false ，是否外链 */
    isOutLink?: boolean;
    /**
     * default：false
     * 透传给 react-router 的设置项，是否精确匹配路由路径值
     */
    exact?: boolean;
    /**
     * default：true
     * 路由页面内容区域是否使用默认的布局样式（如padding等），如需自定义样式，设置此项为false
     */
    setContentLayout?: boolean;
    /**
     * default：true
     * 当前菜单配置是否显示在边栏的菜单组里，
     * 如仅想通过路由访问，不想用户在菜单组里点击该菜单项访问对应的子应用，设置此项为false
     */
    showInSider?: boolean;
    /**
     * 默认值：false
     * 当配置 showInSider 为 true 且同时为该菜单项配置了权限，如果用户无权限访问该菜单对应的路由页面时，该值会起作用
     * alwayInSiderEvenNoAuth 为 true：表示依然让菜单出现在边栏里（此时用户点击访问会出现403为授权的页面提示）
     * alwayInSiderEvenNoAuth 为 false：表示依然让菜单不出现在边栏里
     */
    alwayInSiderEvenNoAuth?: boolean;
    /**
     * default：false
     * 是否是星辰站点的首页，注意该值只需对一个菜单设置即可，如果设置了多个，后者会覆盖前者
     */
    isHomePage?: boolean;
    /**
     * default：left
     * 是否是星辰站点的首页，注意该值只需对一个菜单设置即可，如果设置了多个，后者会覆盖前者
     */
    place?: 'top' | 'left',
  };

  interface IMenuGroupItemOCT {
    key: string;
    label: string;
    iconType: string;
    iconSource: IconSource;
    children: (IMenuItemOCT | IMenuGroupItemOCT)[];
  };

  interface IGroupNameConfOCT {
    /**
     * 访问子应用时，重置边栏显示设置
     */
    siderViewType?: SiderViewTypes;
    /** 对应 hel 里配置的应用名 */
    appName: string;
    /**
     * default: false
     * 是否开启shadow渲染子应用
     */
    allowShadow?: boolean;
    /**
     * default: true
     * 是否允许打开边栏
     */
    allowOpenSider?: boolean;
    /**
     * default: true
     * 是否开启预缓存，对应想实时加载的应用，可以设置此项为false
     */
    allowPreCache?: boolean;
    /**
     * default: 1
     * 子应用对应的 zoom 值
     */
    zoomValue?: number;
  }

  interface IMenuDataOCT {
    /**
     * 匹配中的路由一级路径名需要映射的子应用名称
     * 例如配置了
     * ```ts
     *  { 'xx': { appName: 'xx' }, 'xx-sub': { appName: 'xxyy' } }
     * ```
     * 表示路由 path 为 `/xx`、`/xx/page-a`、`/xx/page-b`的菜单项，都会访问 xx-app 应用
     * 路由 path 为 `/xx-sub`、`/xx-sub/page-a`、`/xx-sub/page-b`的菜单项，都会访问 xxyy 应用
     */
    appGroupName2conf: Record<string, IGroupNameConfOCT>;
    menus: Array<IMenuGroupItemOCT | IMenuItemOCT>;
  }

  interface IHubConfig {
    iconAssetsUrl: string;
    menuData: IMenuDataOCT;
    iconStyles: Record<IconKey, Record<string, any>>;
    [key: string]: any;
  }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export { };
