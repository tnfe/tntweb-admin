import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useSetupCtx } from 'services/concent';
import { CtxDe } from 'types/store';
import BaseIcon, { BaseIconMode } from './common/BaseIcon';

function setup(ctx: CtxDe) {
  return {
    openThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: true }),
  };
}
interface IProps {
  mode?: BaseIconMode,
}

function SettingIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { settings: se } = useSetupCtx(setup);
  const passProps = { mode, Icon: SettingOutlined, onClick: se.openThemeSettingsDrawer };
  return <BaseIcon {...passProps} />;
}

export default React.memo(SettingIcon);
