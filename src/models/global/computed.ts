import { St } from './state';
import { sys } from 'configs/constant';

const { topViewTypes } = sys;
const {
  FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR, FLOWED_HEADER_FLOWED_BAR,
  NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR,
} = topViewTypes;

export function contentLayoutStyle(n: St) {
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

  return { marginLeft, minHeight, paddingTop };
}

export function headerStyle(n: St): React.CSSProperties {
  const { headerTheme, themeColor, siderVisible, topViewType } = n;
  const color = headerTheme === 'dark' ? 'white' : themeColor;
  const backgroundColor = headerTheme === 'dark' ? '#001529' : 'white';
  const marginLeft = siderVisible ? sys.siderWidthPx : '0';

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

export function quickNavBarStyle(n: St) {
  const { siderVisible, topViewType } = n;
  const marginLeft = siderVisible ? sys.siderWidthPx : '0';

  if ([FIXED_HEADER_FIXED_BAR].includes(topViewType)) {
    return { marginLeft, zIndex: 88, position: 'fixed' as const, left: '0', right: '0', top: '48px' };
  }
  if ([NO_HEADER_FIXED_BAR].includes(topViewType)) {
    return { marginLeft, zIndex: 88, position: 'fixed' as const, left: '0', right: '0', top: '0' };
  }
  return { marginLeft };
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
  return siderTheme === 'dark' ? true : false;
}

export function headerThemeSwitchChecked(n: St) {
  const { headerTheme } = n;
  return headerTheme === 'dark' ? true : false;
}
