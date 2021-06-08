import React from 'react';
import { Button, Card, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { history } from 'react-router-concent';
import { routerPath } from 'configs/constant';
import * as mods from 'configs/c2Mods';
import { useC2Mod, typeCtxM } from 'services/concent';
import { VerticalBlank, AsyncButton } from 'components/dumb/general';
import Bar from 'components/Charts/Bar';
import { Trans } from '@lingui/macro';

function setup(c: any) {
  const ctx = typeCtxM(mods.HOME, {}, c);
  ctx.effect(() => {
    const t = setInterval(ctx.mr.ranBarData, 3000);
    return () => clearInterval(t);
  }, []);
}

function Home(props: RouteComponentProps) {
  const { state: homeState, mr: homeMr } = useC2Mod(mods.HOME, { setup });
  const { state, mr } = useC2Mod(mods.COUNTER);

  return (
    <div style={{ paddingTop: '15px' }}>
      <Row>
        <Col>
          <AsyncButton><Trans>欢迎了解与使用 Concent-pro</Trans></AsyncButton>
        </Col>
        <Col>
          <a style={{ marginLeft: '12px' }} href="https://github.com/tnfe/concent-pro" target="blank">
            <GithubOutlined style={{ fontSize: '52px' }} />
          </a>
        </Col>
      </Row>
      <VerticalBlank />
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

