import React from 'react';
import { Popover, Radio, RadioChangeEvent } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { useC2DefaultMod } from 'services/concent';
import { CtxDe } from 'types/store';
import { SiteColorTypes } from 'configs/constant/sys';
import BaseIcon, { BaseIconMode } from './common/BaseIcon';

interface IProps {
  mode?: BaseIconMode,
}

const colorTypeOptions = [
  { label: '正常', value: SiteColorTypes.NORMAL },
  { label: '黑白', value: SiteColorTypes.GREY },
  { label: '暗夜', value: SiteColorTypes.DARK },
];

function setup(ctx: CtxDe) {
  const ins = ctx.initState({
    visible: false,
  });
  return {
    insState: ins.state,
    handleVisibleChange(visible: boolean) {
      ins.setState({ visible });
    },
    changeSiteColorType(e: RadioChangeEvent) {
      ctx.gr.setState({ siteColorType: e.target.value });
    },
  }
}

function SiteColorIcon(props: IProps) {
  const { mode = 'body' } = props;
  const { globalState, settings: se } = useC2DefaultMod({ setup });
  const passProps = { mode, Icon: SkinOutlined };

  const uiContent = <Radio.Group
    options={colorTypeOptions}
    onChange={se.changeSiteColorType}
    value={globalState.siteColorType}
    optionType="button"
    buttonStyle="solid"
  />;

  return <Popover
    placement="bottomLeft"
    content={uiContent}
    title="站点色调"
    trigger="click"
    visible={se.insState.visible}
    onVisibleChange={se.handleVisibleChange}
  >
    <BaseIcon {...passProps} />
  </Popover>;
}

export default React.memo(SiteColorIcon);
