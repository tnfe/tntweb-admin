import * as React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import ParticlesBg from "particles-bg";
import { useSetupCtx } from 'services/concent';
import { CtxDe } from 'types/store';
import { Blank } from 'components/dumb/general';
import Footer from '../Footer';
import styles from '../styles/App.module.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const bgThemes = [
  'square','cobweb', 'color', 'ball',  'polygon', 'lines', 'thick', 'circle',
  'tadpole', 'fountain', 'random', 'list', 'custom',
] as const;
const uiLoginAreaTitle = <img width="200px" alt="tntweb-admin"
  src="https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/c2pro-banner.png"
/>;

function setup(ctx: CtxDe) {
  const ins = ctx.initState({
    themeIdx: 0,
  });

  return {
    insState: ins.state,
    onFinish: (values: any) => {
      ctx.gr.loginByPassword({ name: values.username, pwd: values.password });
    },
    changeLoginBg: () => {
      let nextThemeIdx = ins.state.themeIdx + 1;
      if (nextThemeIdx > bgThemes.length - 1) {
        nextThemeIdx = 0;
      }
      ins.setState({ themeIdx: nextThemeIdx });
    },
  };
}

function Login() {
  const { settings: se, globalState: gst } = useSetupCtx(setup);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <ParticlesBg type={bgThemes[se.insState.themeIdx]} bg={true} />
      <Card className={styles.loginCardWrap} title={uiLoginAreaTitle}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={se.onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="concent" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="pro" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={gst.loginBtnLoading}>
              登录
            </Button>
            <Blank />
            <Button onClick={se.changeLoginBg}>
              切换背景
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div className={styles.footerFixedWrap}>
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(Login);
