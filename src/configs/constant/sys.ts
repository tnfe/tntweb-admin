
export const siderWidth = 200;
export const siderWidthPx = `${siderWidth}px`;
/** 最底层的背景色 */
export const buttomBgColor = '#f0f2f5';
export const contentBgColor = '#fff';
export const siteThemeColor = '#1976d2';

export const webHeaderImg = 'https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/c2pro-banner.png';
/** 短logo图，用于折叠边栏时显示 */
export const webHeaderImgShort = 'https://tnfe.gtimg.com/image/6qg2nmcgzv_1623072630957.png';
export const img404 = '404_img_url';
export const img403 = '403_img_url';

export const LS_C2PRO_SETTINGS = 'C2ProSettings';

export const topViewTypes = {
  FIXED_HEADER_FIXED_BAR: '1',
  FIXED_HEADER_FLOWED_BAR: '2',
  FIXED_HEADER_NO_BAR: '3',
  FLOWED_HEADER_FLOWED_BAR: '4',
  FLOWED_HEADER_NO_BAR: '5',
  NO_HEADER_FLOWED_BAR: '6',
  NO_HEADER_FIXED_BAR: '7',
};

export const siderViewTypes = {
  NO_SIDER: 1,
  NARROW_SIDER: 2,
  WIDE_SIDER: 3,
};

export const topViewType2Label = {
  [topViewTypes.FIXED_HEADER_FIXED_BAR]: '固定顶栏,固定导航条',
  [topViewTypes.FIXED_HEADER_FLOWED_BAR]: '固定顶栏,移动导航条',
  [topViewTypes.FIXED_HEADER_NO_BAR]: '固定顶栏,无导航条',
  [topViewTypes.FLOWED_HEADER_FLOWED_BAR]: '移动顶栏,移动导航条',
  [topViewTypes.FLOWED_HEADER_NO_BAR]: '移动顶栏,无导航条',
  [topViewTypes.NO_HEADER_FLOWED_BAR]: '无顶栏,移动导航条',
  [topViewTypes.NO_HEADER_FIXED_BAR]: '无顶栏,固定导航条',
};
