import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useC2DefaultMod } from 'services/concent';
import BaseIcon, { BaseIconMode } from './common/BaseIcon';

interface IProps {
  mode?: BaseIconMode,
}

function LogoutIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { gr } = useC2DefaultMod();
  const passProps = { mode, Icon: LogoutOutlined, onClick: gr.logout };
  return <BaseIcon {...passProps} />;
}

export default React.memo(LogoutIcon);
