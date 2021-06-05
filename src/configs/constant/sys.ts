
export const siderWidth = 200;
export const siderWidthPx = `${siderWidth}px`;
/** 最底层的背景色 */
export const buttomBgColor = '#f0f2f5';
export const contentBgColor = '#fff';

export const webHeaderImg = 'https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/c2pro-banner.png';
export const img404 = '404_img_url';
export const img403 = '403_img_url';

export const LS_C2PRO_SETTINGS = 'C2ProSettings';

export const topViewTypes = {
  FIXED_HEADER_FIXED_BAR: 1,
  FIXED_HEADER_FLOWED_BAR: 2,
  FLOWED_HEADER_FLOWED_BAR: 3,
  NO_HEADER_FLOWED_BAR: 4,
  NO_HEADER_FIXED_BAR: 5,
};

export const topViewType2Label = {
  [topViewTypes.FIXED_HEADER_FIXED_BAR]: '顶栏固定,导航条固定',
  [topViewTypes.FIXED_HEADER_FLOWED_BAR]: '顶栏固定,导航条移动',
  [topViewTypes.FLOWED_HEADER_FLOWED_BAR]: '顶栏移动,导航条移动',
  [topViewTypes.NO_HEADER_FLOWED_BAR]: '顶栏不展示,导航条可移动',
  [topViewTypes.NO_HEADER_FIXED_BAR]: '顶栏不展示,导航条固定',
};
