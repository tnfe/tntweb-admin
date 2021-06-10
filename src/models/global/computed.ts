import { St } from './state';
import { sys } from 'configs/constant';

const { topViewTypes, siderViewTypes } = sys;
const {
  FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR, FIXED_HEADER_NO_BAR,
  FLOWED_HEADER_FLOWED_BAR, FLOWED_HEADER_NO_BAR,
  NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR,
} = topViewTypes;
const { NO_SIDER, NARROW_SIDER, WIDE_SIDER } = siderViewTypes;

const viewType2LeftValue = {
  [NO_SIDER]: '0',
  [NARROW_SIDER]: '48px',
  [WIDE_SIDER]: sys.siderWidthPx,
};

/**
 * MainContent 组件根节点样式
 */
export function contentLayoutStyle(n: St): React.CSSProperties {
  const { siderViewType, topViewType } = n;
  const minHeight = 'calc(100vh - 120px)';
  let paddingTop = '0';

  if ([FIXED_HEADER_FIXED_BAR].includes(topViewType)) {
    paddingTop = '80px';
  }
  if ([FIXED_HEADER_FLOWED_BAR, FLOWED_HEADER_FLOWED_BAR, FLOWED_HEADER_NO_BAR].includes(topViewType)) {
    paddingTop = '0';
  }
  if ([FIXED_HEADER_NO_BAR, NO_HEADER_FIXED_BAR].includes(topViewType)) {
    paddingTop = '48px';
  }
  if ([NO_HEADER_FIXED_BAR].includes(topViewType)) {
    paddingTop = '32px';
  }

  return { marginLeft: viewType2LeftValue[siderViewType], minHeight, paddingTop, overflowX: 'auto' };
}

/**
 * 顶部区域头部信息的布局样式
 */
export function headerStyle(n: St): React.CSSProperties {
  const { headerTheme, themeColor, siderViewType, topViewType } = n;
  // 该颜色控制 settingIcon 在 header 里显示的颜色，会受是否暗黑主题色影响
  const color = headerTheme === 'dark' ? 'white' : themeColor;
  const backgroundColor = headerTheme === 'dark' ? '#001529' : 'white';
  const marginLeft = viewType2LeftValue[siderViewType];

  if ([FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR, FIXED_HEADER_NO_BAR].includes(topViewType)) {
    return { marginLeft, color, backgroundColor, position: 'fixed' as const, left: '0', right: '0' };
  }
  if ([FLOWED_HEADER_FLOWED_BAR, FLOWED_HEADER_NO_BAR].includes(topViewType)) {
    return { marginLeft };
  }
  if ([NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { display: 'none' };
  }
  return { marginLeft };
}

/**
 * 顶部区域导航条的布局样式
 */
export function quickNavBarStyle(n: St): React.CSSProperties {
  const { siderViewType, topViewType } = n;
  // 对于快捷导航条来说，不使用 marginLeft 方式来做导航条内容和边栏内容不重叠的效果
  // 是为了考虑到导航条里的子元素使用 absolute 属性时能够配合导航条自身的 relative 正常工作
  // 如适用 marginLeft，子元素 absolute 的同时设置的 right 等值会让子元素显示在导航条外部
  const paddingLeft = viewType2LeftValue[siderViewType];

  if ([FIXED_HEADER_FIXED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, position: 'fixed' as const, left: '0', right: '0', top: '48px' };
  }
  if ([FIXED_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, marginTop: '48px' };
  }
  if ([FLOWED_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, position: 'relative' };
  }
  if ([FIXED_HEADER_NO_BAR, FLOWED_HEADER_NO_BAR].includes(topViewType)) {
    return { display: 'none' };
  }
  if ([NO_HEADER_FIXED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, position: 'fixed' as const, left: '0', right: '0', top: '0' };
  }
  return { boxSizing: 'border-box', paddingLeft, position: 'relative' };
}

export function siderStyle(n: St): React.CSSProperties {
  const { siderTheme, siderViewType } = n;
  // 该颜色控制 settingIcon 在 header 里显示的颜色，会受是否暗黑主题色影响
  const backgroundColor = siderTheme === 'dark' ? '#001529' : 'white';
  let width = '0px';
  if (siderViewType === siderViewTypes.NARROW_SIDER) {
    width = '48px';
  } else if (siderViewType === siderViewTypes.WIDE_SIDER) {
    width = sys.siderWidthPx;
  }
  return { backgroundColor, width };
}

/**
 * 设置按钮的展示控制
 */
export function settingIconShowCtrl(n: St) {
  const { topViewType } = n;
  if ([NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { showInBar: true, showInHeader: false };
  }
  return { showInBar: false, showInHeader: true };
}

interface ISiderInfo {
  iconDes: 'left' | 'right';
  /** 边栏是否是展开的，true：展开，false：折叠 */
  isUnfold: boolean;
  /** 边栏是否可见，true：可见，false：不可见 */
  showSider: boolean;
}
export function siderInfo(n: St): ISiderInfo {
  const { siderViewType } = n;
  const iconDes = siderViewType === siderViewTypes.NO_SIDER ? 'right' : 'left';
  const isUnfold = siderViewType === siderViewTypes.WIDE_SIDER;
  const showSider = siderViewType !== siderViewTypes.NO_SIDER;
  return { iconDes, isUnfold, showSider };
}

export function siderThemeSwitchChecked(n: St) {
  const { siderTheme } = n;
  return siderTheme === 'dark';
}

export function headerThemeSwitchChecked(n: St) {
  const { headerTheme } = n;
  return headerTheme === 'dark';
}

export function navBarItemCls(n: St) {
  return n.isTabPaneHeavyBg ? 'quickNavBarWrap' : 'quickNavBarLightWrap';
}
