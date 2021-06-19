import React from 'react';
import { Avatar } from 'antd';
import { useC2DefaultMod } from 'services/concent';
import styles from '../../styles/App.module.css';

export type BaseIconMode = 'bar' | 'header' | 'body';

interface IProps {
  mode?: BaseIconMode,
  onClick?: (...args: any[]) => any,
  Icon: React.ForwardRefExoticComponent<any>,
}

const iconClsMap = {
  bar: '',
  header: styles.settingInHeader,
  body: styles.settingInBody,
};
const uiEmpty = <span style={{ display: 'none' }} />;

function BaseIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { globalComputed: gcu } = useC2DefaultMod();

  if (mode === 'body' && !gcu.iconCtrl.showInBody) {
    return uiEmpty;
  }

  const iconCls = `${iconClsMap[mode]} gHover`;
  const style = { color: gcu.iconCtrl.color };

  if (mode === 'body') {
    return <Avatar className={iconCls} icon={<props.Icon onClick={props.onClick} style={style} />} />;
  }
  return <props.Icon onClick={props.onClick} className={iconCls} style={style} />;
}

export default React.memo(BaseIcon);
