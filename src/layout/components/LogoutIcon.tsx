import React from 'react';
import { Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useC2DefaultMod } from 'services/concent';
import { CtxDe } from 'types/store';
import BaseIcon, { BaseIconMode } from './common/BaseIcon';

interface IProps {
  mode?: BaseIconMode,
}

function setup(ctx: CtxDe) {
  return {
    logout() {
      Modal.confirm({
        onOk() {
          ctx.gr.logout();
        },
        title: '提示',
        content: '确认要登出 concent-pro 吗?',
      });
    },
  };
}

function LogoutIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { settings } = useC2DefaultMod({ setup });
  const passProps = { mode, Icon: LogoutOutlined, onClick: settings.logout };
  return <BaseIcon {...passProps} />;
}

export default React.memo(LogoutIcon);
