
/**
 * 应用左侧的导航栏配置
 */
import { lazy } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  FormOutlined, OrderedListOutlined, PlusCircleOutlined, RightCircleOutlined,
} from '@ant-design/icons';
import { routerPath } from './constant';
import { isLocalMode } from 'utils/common';
import HomePage from 'pages/Home';
// const HomePage = lazy(() => import('pages/Home'));

export interface IMenuItem {
  key?: string;
  /**
   * 路由组件对应的权限id，如果配置了此值，且 globalState.authIds 不包含这个值，会被渲染为 NotAuth组件
   * 修改 models/global/reducer.ts 的 prepareApp 逻辑填充 authIds 数据
   */
  authId?: string | number,
  path: string;
  /** 默认值：false ，是否外链 */
  isOutLink?: boolean;
  extraData?: Record<string, any>;
  /** 默认 false */
  exact?: boolean;
  place?: 'top' | 'left',
  /**
   * 默认值：true，
   * 是否在边栏里展示，（需注意，配置为true，但是配置了authId，也不一定能展现出来，最后在 derived/menus会结合权限做二次计算）
   * 为 false 时，只是菜单里看不到入口了，通过路由依然能访问
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
   * 菜单对应的页面组件
   */
  Component: React.ComponentType<any>;
  /**
   * 路由对应的实际组件挂载前执行的逻辑
   * 如果返回了具体的组件片段，则会替换掉改路由对应的实际组件
   * 通常的使用场景:
   * 1 提奖将路由信息写入某个store，子组件渲染时能够及时拿到
   * 2 判断某些条件，不成立的话，不挂载目标路由组件，替换为该函数返回的视图片段
   */
  beforeComponentMount?: (props: RouteComponentProps) => React.ReactNode | void;
  /**
   * 默认值：true
   * 页面组件是否包一层统一的默认布局组件
   */
  setContentLayout?: boolean;
  label: string;
  Icon?: React.FC<any>;
  iconType?: string;
  iconSource?: string;
  /** 默认 false，是否是首页，匹配路径 / 时也能访问 */
  isHomePage?: boolean;
  children?: IMenuItem[];
}

export interface IMenuGroup {
  /** 用于辅助计算 menu是否展开 */
  key: string;
  label: string;
  place?: 'top' | 'left',
  Icon?: React.SFC<{ style?: React.CSSProperties }>;
  children: (IMenuItem | IMenuGroup)[];
}

const showUnderLocalMode = isLocalMode();

const menus: Array<IMenuItem | IMenuGroup> = [
  {
    Icon: FormOutlined,
    label: '首页',
    path: routerPath.DEMO,
    Component: HomePage,
    isHomePage: true,
    setContentLayout: false,
  },
  {
    key: 'listExamples',
    label: 'list示例集合',
    Icon: OrderedListOutlined,
    children: [
      {
        Icon: FormOutlined,
        label: '简单列表',
        path: routerPath.SIMPLE_LIST,
        Component: lazy(() => import('pages/TodoList')),
      },
      {
        showInSider: showUnderLocalMode,
        label: 'todoList',
        path: '/todolist',
        Component: lazy(() => import('pages/TodoList')),
      },
    ]
  },
  {
    label: 'template',
    path: '/template',
    Component: lazy(() => import('pages/_Demos/Template')),
  },
  {
    label: '计数器',
    path: '/counter',
    Icon: PlusCircleOutlined,
    Component: lazy(() => import('pages/Counter')),
  },
  {
    label: '计数器2',
    path: '/counter2',
    Icon: PlusCircleOutlined,
    setContentLayout: false,
    Component: lazy(() => import('pages/Counter')),
  },
  {
    label: '分步表单',
    path: routerPath.STEP_FORM,
    setContentLayout: false,
    Component: lazy(() => import('pages/AStepForm')),
  },
  {
    Icon: RightCircleOutlined,
    label: 'useSetup',
    path: routerPath.DEMO_USE_SETUP,
    Component: lazy(() => import('pages/_Demos/SomeComponent/UseSetup')),
  },
];

export default menus;
