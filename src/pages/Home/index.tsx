import React from 'react';
import { Button, Card, Row, Col, Tooltip, Radio, RadioChangeEvent, Divider } from 'antd';
import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { history } from 'react-router-concent';
import { routerPath } from 'configs/constant';
import { TopHeaderTypes, TopNavBarTypes, SiderViewTypes } from 'configs/constant/sys';
import * as mods from 'configs/c2Mods';
import { useC2Mod, typeCtxM } from 'services/concent';
import { VerticalBlank, AsyncButton, Blank } from 'components/dumb/general';
import { AuthView } from 'components';
import { Bar, Area, Scatter, HorizontalBar } from 'components/Charts';

const layoutOptions = [
  { label: '折叠边栏，仅显示快捷导航条', value: '1' },
  { label: '展开边栏，仅显示快捷导航条', value: '2' },
  { label: '隐藏边栏，显示顶栏信息和快捷导航条', value: '3' },
];

const responsiveColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

function setup(c: any) {
  const ctx = typeCtxM(mods.HOME, {}, c);
  const { effect, gr, globalState } = ctx;
  effect(() => {
    ctx.mr.ranChartData();
    const t = setInterval(ctx.mr.ranChartData, 3000);
    return () => clearInterval(t);
  }, []);

  return {
    changeTopViewType(e: RadioChangeEvent) {
      const layout = e.target.value;
      const argMap: Record<string, [SiderViewTypes, TopHeaderTypes, TopNavBarTypes]> = {
        1: [SiderViewTypes.COLLAPSED, TopHeaderTypes.HIDDEN, TopNavBarTypes.FIXED],
        2: [SiderViewTypes.NOT_COLLAPSED, TopHeaderTypes.HIDDEN, TopNavBarTypes.FIXED],
        3: [SiderViewTypes.HIDDEN, TopHeaderTypes.FIXED, TopNavBarTypes.FIXED],
      };
      const [siderViewType, topHeaderType, topNavBarType] = argMap[layout];
      gr.setState({ siderViewType, topHeaderType, topNavBarType });
    },
    addAuthId() {
      const { authIds } = globalState;
      if (!authIds.includes('key_1')) {
        authIds.push('key_1');
        gr.setState({ authIds });
      }
    },
    delAuthId() {
      const { authIds } = globalState;
      if (authIds.indexOf('key_1') >= 0) {
        authIds.splice(authIds.indexOf('key_1'), 1);
        gr.setState({ authIds });
      }
    },
  };
}


function Home(props: RouteComponentProps) {
  const { state: homeState, mr: homeMr, settings: se } = useC2Mod(mods.HOME, { setup });
  const { state, mr } = useC2Mod(mods.COUNTER);

  return (
    <div style={{ padding: '15px' }}>
      <Card>
        <Row>
          <Col>
            <AsyncButton>欢迎访问与了解tntweb-admin</AsyncButton>
            {/* 或者写为 */}
            {/* <AsyncButton><Trans id="welcomeLabel"></Trans></AsyncButton> */}
          </Col>
          <Col>
            <a style={{ marginLeft: '12px' }} href="https://github.com/tnfe/tntweb-admin" target="blank">
              <GithubOutlined style={{ fontSize: '52px' }} />
            </a>
          </Col>
        </Row>
      </Card>
      <VerticalBlank />
      <Row justify="space-around" gutter={19}>
        <Col {...responsiveColProps}>
          <Card>
            <div style={{ color: 'rgba(0,0,0,.45)' }}>总销售额</div>
            <div style={{ fontSize: '30px' }}>￥ 126,560</div>
            <Bar data={homeState.barData} height="80px" />
            <Divider style={{ margin: '12px 0' }} />
            <div>日销售额 ￥ 600</div>
          </Card>
        </Col>
        <Col {...responsiveColProps}>
          <Card>
            <div style={{ color: 'rgba(0,0,0,.45)' }}>年降雨量</div>
            <div style={{ fontSize: '30px' }}>cc 663,222</div>
            <Area data={homeState.areaData} height="80px" />
            <Divider style={{ margin: '12px 0' }} />
            <div>评级降雨量 cc 200</div>
          </Card>
        </Col>
        <Col {...responsiveColProps}>
          <Card>
            <div style={{ color: 'rgba(0,0,0,.45)' }}>男女分布</div>
            <div style={{ fontSize: '30px' }}>55:45</div>
            <Scatter data={homeState.scatterData} height="80px" />
            <Divider style={{ margin: '12px 0' }} />
            <div>差异值  10</div>
          </Card>
        </Col>
        <Col {...responsiveColProps}>
          <Card>
            <div style={{ color: 'rgba(0,0,0,.45)' }}>人口比例</div>
            <div style={{ fontSize: '30px' }}>(0.2~0.3):(0.4~0.8)</div>
            <HorizontalBar data={homeState.horizontalBarData} height="80px" />
            <Divider style={{ margin: '12px 0' }} />
            <div>浮动值 +- 8</div>
          </Card>
        </Col>
      </Row>

      <Card>
        <AuthView authId="key_1"><h1>you can not see me if you have not auth</h1></AuthView>
        <Button type="primary" onClick={se.addAuthId}>
          点击此按钮，将看到一个带权限控制的视图
      </Button>
        <Blank />
        <Button type="primary" onClick={se.delAuthId}>
          移出权限
      </Button>
        <VerticalBlank height="32px" />
        <div>
          <Tooltip title="更多布局点击右上角设置按钮查看">
            <span>选择一个喜欢的布局吧<QuestionCircleOutlined /> : </span>
          </Tooltip>
          <Blank />
          <Radio.Group options={layoutOptions} onChange={se.changeTopViewType} />
        </div>
        <VerticalBlank height="32px" />
        <Button type="primary" onClick={() => history.push(`/counter?a=${Date.now()}`)}>
          跳转到一个带随机参的Counter页面
      </Button>
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
        <Button type="primary" onClick={homeMr.ranChartData}>ran bar data</Button>
        <VerticalBlank height="32px" />
      </Card>
    </div>
  );
}

export default React.memo(Home);

