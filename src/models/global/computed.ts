import { St } from './state';
import { sys } from 'configs/constant';

export function contentLayoutStyle(n: St) {
  const { siderVisible, fixHeader } = n;
  const minHeight = 'calc(100vh - 120px)';
  const paddingTop = fixHeader ? '80px' : '0';

  return siderVisible
    ? { marginLeft: sys.siderWidthPx, minHeight, paddingTop }
    : { marginLeft: '0', paddingTop, minHeight };
}

export function headerStyle(n: St) {
  const { headerTheme, themeColor, siderVisible, fixHeader } = n;
  let hstyle: React.CSSProperties = { marginLeft: '', color: '', backgroundColor: '' };
  if (fixHeader) {
    hstyle = { marginLeft: '', color: '', backgroundColor: '', position: 'fixed' as const, left: '0', right: '0' };
  }
  siderVisible ? hstyle.marginLeft = sys.siderWidthPx : hstyle.marginLeft = '0';
  headerTheme === 'dark' ? hstyle.color = 'white' : hstyle.color = themeColor;
  headerTheme === 'dark' ? hstyle.backgroundColor = '#001529' : hstyle.backgroundColor = 'white';
  return hstyle;
}

export function quickNavBarStyle(n: St) {
  const { siderVisible, fixHeader } = n;
  let style: React.CSSProperties = { marginLeft: '' };
  if (fixHeader) {
    style = { marginLeft: '', zIndex: 88, position: 'fixed' as const, left: '0', right: '0', top: '48px' };
  }
  siderVisible ? style.marginLeft = sys.siderWidthPx : style.marginLeft = '0';
  return style;
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
