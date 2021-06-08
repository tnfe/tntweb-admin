import React from 'react'
import { sys } from 'configs/constant';
import styles from '../App.module.css';

interface IProps {
  long?: boolean;
}

export default function Logo(props: IProps) {
  const { long = true } = props
  const imgSrc = long ? sys.webHeaderImg : sys.webHeaderImgShort;
  const style: React.CSSProperties = { backgroundImage: `url(${imgSrc})`, width: sys.siderWidthPx };
  if (!long) {
    style.width = '48px';
  }

  return (
    <div style={style} className={styles.logoWrap}>
    </div>
  );
  // const { fixed = false, long = true } = props
  // let style = fixed ? fixedStyle : normalStyle;
  // const imgSrc = long ? sys.webHeaderImg : sys.webHeaderImgShort;
  // if (!long) style = shortStyle;
  // return (
  //   <img style={style} src={imgSrc} alt="header_img"></img>
  // )
}
