import React from 'react'
import { sys } from 'configs/constant';

const fixedStyle: React.CSSProperties = { width: sys.siderWidth - 60, position: 'fixed', left: '19px', top: '11px' };
const normalStyle: React.CSSProperties = { width: sys.siderWidth - 60 };

interface IProps {
  fixed?: boolean;
}

export default function Logo(props: IProps) {
  const style = props.fixed ? fixedStyle : normalStyle;
  return (
    <img style={style} src={sys.webHeaderImg} alt="header_img"></img>
  )
}
