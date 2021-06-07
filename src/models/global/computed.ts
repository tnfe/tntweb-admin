import { St } from './state';
import { sys } from 'configs/constant';

const { topViewTypes } = sys;
const {
  FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR, FLOWED_HEADER_FLOWED_BAR,
  NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR,
} = topViewTypes;

/**
 * 路由组件内容区域的布局样式
 */
export function contentLayoutStyle(n: St): React.CSSProperties {
  const { siderVisible, topViewType } = n;
  const marginLeft = siderVisible ? sys.siderWidthPx : '0';
  const minHeight = 'calc(100vh - 120px)';
  let paddingTop = '0';

  if ([FIXED_HEADER_FIXED_BAR].includes(topViewType)) {
    paddingTop = '80px';
  }
  if ([FIXED_HEADER_FLOWED_BAR].includes(topViewType)) {
    paddingTop = '32px';
  }
  if ([NO_HEADER_FIXED_BAR].includes(topViewType)) {
    paddingTop = '32px';
  }

  return { marginLeft, minHeight, paddingTop, overflowX: 'auto' };
}

/**
 * 顶部区域头部信息的布局样式
 */
export function headerStyle(n: St): React.CSSProperties {
  const { headerTheme, themeColor, siderVisible, topViewType } = n;
  // 该颜色控制 settingIcon 在 header 里显示的颜色，会受是否暗黑主题色影响
  const color = headerTheme === 'dark' ? 'white' : themeColor;
  const backgroundColor = headerTheme === 'dark' ? '#001529' : 'white';
  const marginLeft = siderVisible ? sys.siderWidthPx : '0';
  // const paddingLeft = siderVisible ? sys.siderWidthPx : '0';

  if ([FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { marginLeft, color, backgroundColor, position: 'fixed' as const, left: '0', right: '0' };
  }
  if ([FLOWED_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { marginLeft, color, backgroundColor };
  }
  if ([NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR].includes(topViewType)) {
    return { display: 'none' };
  }
  return {};
}

/**
 * 顶部区域导航条的布局样式
 */
export function quickNavBarStyle(n: St): React.CSSProperties {
  const { siderVisible, topViewType } = n;
  // const marginLeft = siderVisible ? sys.siderWidthPx : '0';
  // 对于快捷导航条来说，不使用 marginLeft 方式来做导航条内容和边栏内容不重叠的效果
  // 是为了考虑到导航条里的子元素使用 absolute 属性时能够配合导航条自身的 relative 正常工作
  // 如适用 marginLeft，子元素 absolute 的同时设置的 right 等值会让子元素显示在导航条外部
  const paddingLeft = siderVisible ? sys.siderWidthPx : '0';


  if ([FIXED_HEADER_FIXED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, position: 'fixed' as const, left: '0', right: '0', top: '48px' };
  }
  if ([NO_HEADER_FIXED_BAR].includes(topViewType)) {
    return { boxSizing: 'border-box', paddingLeft, zIndex: 5, position: 'fixed' as const, left: '0', right: '0', top: '0' };
  }
  return { boxSizing: 'border-box', paddingLeft, position: 'relative' };
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

export function siderIconDes(n: St) {
  return n.siderVisible ? 'left' : 'right';
}

export function siderThemeSwitchChecked(n: St) {
  const { siderTheme } = n;
  return siderTheme === 'dark';
}

export function headerThemeSwitchChecked(n: St) {
  const { headerTheme } = n;
  return headerTheme === 'dark';
}
