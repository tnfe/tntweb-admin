import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
import { decideVal } from 'utils/obj';

type Icon = React.FC<{ style?: React.CSSProperties, type: string, className?: string }>;
type PooledIcon = React.FC<{ style?: React.CSSProperties }>;

const commonIcons: {
  XcIcon: Icon,
} = {
  XcIcon: () => <h1>未调用 loadIconByUrl 进行初始化!! </h1>,
};

const stHotEventForMenu = { fontSize: '22px', transform: 'translate(-5px, 3px)', marginRight: '0px' };
const customizedIcons = {
  HotEvent: () => <icons.XcIcon type="icon-redianshijian" />,
  HotEventForMenu: () => <icons.XcIcon style={stHotEventForMenu} type="icon-redianshijian" />,
};

export const icons = {
  ...commonIcons,
  ...customizedIcons,
};

const iconPoolStyleMap: Record<string, any> = {};
/**
 * icon 的样式，需在 src/index.ts 里提前写入，方便后续模块使用
 * iconPool['icon-xxx'] 时，就能够正确写入样式
 * @param map
 */
export function setIconPoolStyleMap(map: Record<string, any>) {
  map && Object.assign(iconPoolStyleMap, map);
}

// 方便动态根据 key 拿到icon组件 iconPool['icon-xxx']
export const iconPool: { [key: string]: PooledIcon } = new Proxy({}, {
  get(target, key: string) {
    const style = iconPoolStyleMap[key] || {};
    return (props: { style?: React.CSSProperties, className?: string }) => {
      const mergedStyle = { ...style, ...decideVal(props.style, {}) };
      const targetCls = decideVal(props.className, '');
      return <icons.XcIcon type={key} style={mergedStyle} className={targetCls} />;
    };
  },
});

export function loadIconByUrl(url: string) {
  icons.XcIcon = createFromIconfontCN({
    // 在 iconfont.cn 上生成，可拷贝上传到自己维护的 cdn 上
    // scriptUrl: '//at.alicdn.com/t/font_1239425_qzdgyf4x6j.js',
    // scriptUrl: 'https://tnfe.gtimg.com/leah-libs/iconfont_v3.js',
    scriptUrl: url,
  });
}

export default icons;
