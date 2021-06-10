import React from 'react';
import styled from 'styled-components';
import { Row, Col, Drawer, Switch, Tag, Select, Radio, RadioChangeEvent, Tooltip, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { HeartOutlined, CopyOutlined } from '@ant-design/icons';
import { SketchPicker, ColorResult, SwatchesPicker } from 'react-color';
import { Blank, VerticalBlank } from 'components/dumb/general';
import { useSetupCtx } from 'services/concent';
import { success } from 'services/message';
import { topViewTypes, topViewType2Label } from 'configs/constant/sys';
import { CtxDe } from 'types/store';

const { Option } = Select;
const MySwatchesPicker: any = styled(SwatchesPicker)`
  width: 450px !important;
`;

const {
  FIXED_HEADER_FIXED_BAR, FIXED_HEADER_FLOWED_BAR, FIXED_HEADER_NO_BAR,
  FLOWED_HEADER_FLOWED_BAR, FLOWED_HEADER_NO_BAR,
  NO_HEADER_FIXED_BAR, NO_HEADER_FLOWED_BAR,
} = topViewTypes;
const stLoveIcon: React.CSSProperties = { color: 'var(--theme-color)', transform: 'translateY(2px)' };

export function setup(ctx: CtxDe) {
  const { gr, globalState } = ctx;
  const ins = ctx.initState({
    pickerMode: 'fast',
  });

  return {
    state: ins.state,
    closeThemeSettingsDrawer: () => ctx.setGlobalState({ settingDrawerVisible: false }),
    changePickerMode(e: RadioChangeEvent) {
      ins.setState({ pickerMode: e.target.value });
    },
    changeTopViewType(value: string) {
      gr.changeTopViewType(value);
    },
    onWebsiteColorChange(colorResult: ColorResult) {
      gr.changeThemeColor({ themeColor: colorResult.hex, setCustThemeColor: true });
    },
    onSiderThemeChange(checked: boolean) {
      gr.switchSiderTheme(checked);
    },
    changeIsUsingDefaultTheme(checked: boolean) {
      gr.changeIsUsingDefaultTheme(checked);
    },
    onHeaderThemeChange(checked: boolean) {
      gr.switchHeaderTheme(checked);
    },
    onInnerMockChange(checked: boolean) {
      gr.changeIsInnerMock(checked);
    },
    copyColor() {
      copy(globalState.themeColor);
      success(`色值 ${globalState.themeColor} 已复制`, 1);
    },
    changeIsTabPaneHeavyBg: (isTabPaneHeavyBg: boolean) => {
      gr.changeIsTabPaneHeavyBg(isTabPaneHeavyBg);
    },
  };
}

export function SettingDrawer() {
  const { globalState: gst, globalComputed: gcu, settings: se, gr } = useSetupCtx(setup, { tag: 'SettingPanel' });

  return (
    <Drawer title="常用设置" visible={gst.settingDrawerVisible} width="550px"
      onClose={se.closeThemeSettingsDrawer}
    >
      <div style={{ padding: '12px 28px' }}>
        <Tag color="geekblue">站点主题设置：</Tag>
        <Blank />
        <Radio.Group value={se.state.pickerMode} onChange={se.changePickerMode}>
          <Radio value="fast">快速</Radio>
          <Radio value="professional">专业</Radio>
        </Radio.Group>
        <Tag color={gst.themeColor}>{gst.themeColor}</Tag>
        <CopyOutlined className="gHover" onClick={se.copyColor} />
        <VerticalBlank />
        {se.state.pickerMode === 'fast'
          && <MySwatchesPicker color={gst.themeColor} onChange={se.onWebsiteColorChange} />
        }
        {se.state.pickerMode === 'professional'
          && <SketchPicker color={gst.themeColor} onChange={se.onWebsiteColorChange}
            onChangeComplete={se.onWebsiteColorChange}
          />
        }
        <VerticalBlank />
        <Row gutter={[16, { xs: 8, sm: 12, md: 12, lg: 12 }]}>
          <Col span="10"><Tag color="geekblue">恢复默认主题：</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="是" unCheckedChildren="否" checked={gst.isUsingDefaultThemeColor} onChange={se.changeIsUsingDefaultTheme} />
          </Col>
          <Col span="10"><VerticalBlank height="5px" /><Tag color="geekblue">字体颜色透明度：</Tag></Col>
          <Col span="14">
            <Slider value={gst.fontAlpha} min={0} max={100} onChange={gr.changeFontAlpha} />
          </Col>
          <Col span="10"><Tag color="geekblue">导航条项目深色背景：</Tag></Col>
          <Col span="14">
            <Switch checked={gst.isTabPaneHeavyBg} onChange={se.changeIsTabPaneHeavyBg}
              checkedChildren="深" unCheckedChildren="浅"
            />
          </Col>
          <Col span="10"><Tag color="geekblue">暗黑边栏：</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gcu.siderThemeSwitchChecked} onChange={se.onSiderThemeChange} />
          </Col>
          <Col span="10"><Tag color="geekblue">暗黑顶栏：</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gcu.headerThemeSwitchChecked}
              onChange={se.onHeaderThemeChange}
            />
          </Col>
          <Col span="10"><VerticalBlank height="5px" /><Tag color="geekblue">顶部区域信息展示方式：</Tag></Col>
          <Col span="14">
            <Select value={gst.topViewType} onChange={se.changeTopViewType} style={{ width: '100%' }}>
              <Option value={FIXED_HEADER_FIXED_BAR}>{topViewType2Label[FIXED_HEADER_FIXED_BAR]}</Option>
              <Option value={FIXED_HEADER_FLOWED_BAR}>{topViewType2Label[FIXED_HEADER_FLOWED_BAR]}</Option>
              <Option value={FIXED_HEADER_NO_BAR}>{topViewType2Label[FIXED_HEADER_NO_BAR]}</Option>
              <Option value={FLOWED_HEADER_FLOWED_BAR}>{topViewType2Label[FLOWED_HEADER_FLOWED_BAR]}</Option>
              <Option value={FLOWED_HEADER_NO_BAR}>{topViewType2Label[FLOWED_HEADER_NO_BAR]}</Option>
              <Option value={NO_HEADER_FLOWED_BAR}>{topViewType2Label[NO_HEADER_FLOWED_BAR]}</Option>
              <Option value={NO_HEADER_FIXED_BAR}>
                {topViewType2Label[NO_HEADER_FIXED_BAR]}<Blank width="8px" />
                <Tooltip title="推荐使用此方式，能够在边栏折叠后，获得最大的垂直视觉空间，同时也不会隐藏掉快捷导航条">
                  <HeartOutlined style={stLoveIcon} />
                </Tooltip>
              </Option>
            </Select>
          </Col>
          <Col span="10"><Tag color="geekblue">innerMock设置：</Tag></Col>
          <Col span="14">
            <Switch checkedChildren="关闭" unCheckedChildren="开启" checked={gst.isInnerMock}
              onChange={se.onInnerMockChange}
            />
          </Col>
        </Row>
      </div>
    </Drawer>
  );
}

export default React.memo(SettingDrawer);
