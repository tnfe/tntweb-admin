import React from 'react';
import { Button, Card, Row, Col, Tooltip, Radio, RadioChangeEvent } from 'antd';
import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { history } from 'react-router-concent';
import { routerPath } from 'configs/constant';
import { topViewTypes, siderViewTypes } from 'configs/constant/sys';
import * as mods from 'configs/c2Mods';
import { useC2Mod, typeCtxM } from 'services/concent';
import { VerticalBlank, AsyncButton, Blank } from 'components/dumb/general';
import Bar from 'components/Charts/Bar';

const layoutOptions = [
  { label: '折叠边栏，仅显示快捷导航条', value: '1' },
  { label: '展开边栏，仅显示快捷导航条', value: '2' },
  { label: '隐藏边栏，显示顶栏信息和快捷导航条', value: '3' },
];

function setup(c: any) {
  const ctx = typeCtxM(mods.HOME, {}, c);
  const { effect, gr } = ctx;
  effect(() => {
    const t = setInterval(ctx.mr.ranBarData, 3000);
    return () => clearInterval(t);
  }, []);

  return {
    changeTopViewType(e: RadioChangeEvent) {
      const layout = e.target.value;
      const argMap: Record<string, [number, string]> = {
        1: [siderViewTypes.NARROW_SIDER, topViewTypes.NO_HEADER_FIXED_BAR],
        2: [siderViewTypes.WIDE_SIDER, topViewTypes.NO_HEADER_FIXED_BAR],
        3: [siderViewTypes.NO_SIDER, topViewTypes.FIXED_HEADER_FIXED_BAR],
      };
      const [siderViewType, topViewType] = argMap[layout];
      gr.setState({ siderViewType: siderViewType });
      gr.changeTopViewType(topViewType);
    },
  };
}

function Home(props: RouteComponentProps) {
  const { state: homeState, mr: homeMr, settings: se } = useC2Mod(mods.HOME, { setup });
  const { state, mr } = useC2Mod(mods.COUNTER);

  return (
    <div style={{ paddingTop: '15px' }}>
      <Row>
        <Col>
          <AsyncButton>欢迎了解与使用 Concent-pro </AsyncButton>
        </Col>
        <Col>
          <a style={{ marginLeft: '12px' }} href="https://github.com/tnfe/concent-pro" target="blank">
            <GithubOutlined style={{ fontSize: '52px' }} />
          </a>
        </Col>
      </Row>
      <VerticalBlank height="32px" />
      <div>
        <Tooltip title="更多布局点击右上角设置按钮查看">
          <span>选择一个喜欢的布局吧<QuestionCircleOutlined/> : </span>
        </Tooltip>
        <Blank />
        <Radio.Group options={layoutOptions} onChange={se.changeTopViewType} />
      </div>
      <VerticalBlank height="32px" />
      <Row>
        <Col span="8">
          <Card
            onClick={() => history.push(routerPath.SIMPLE_LIST)}
            hoverable
            style={{ width: '80%' }}
            cover={<img alt="example" src="https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF" />}
          >
            <Card.Meta title="访问demo" description="提供xxx等功能" />
          </Card>
        </Col>
        <Col span="8">
          <Card
            onClick={() => history.push(routerPath.STEP_FORM)}
            hoverable
            style={{ width: '80%' }}
            cover={<img alt="example" src="https://t7.baidu.com/it/u=2763645735,2016465681&fm=193&f=GIF" />}
          >
            <Card.Meta title="访问分步表单" description="快速创建xx业务" />
          </Card>
        </Col>
      </Row>
      <VerticalBlank height="32px" />
      <h3>mods.COUNTER.state.value {state.value}</h3>
      <Button onClick={mr.increment}>change value</Button>
      <VerticalBlank height="32px" />
      <Button type="primary" onClick={homeMr.ranBarData}>ran bar data</Button>
      <VerticalBlank height="32px" />
      <Bar data={homeState.barData} />
    </div>
  );
}

export default React.memo(Home);

