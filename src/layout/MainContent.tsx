// +++ node modules +++
import React from 'react';
import { Layout, Spin, Skeleton } from 'antd';
import { EmptyView } from 'components/dumb/general';
import { useC2DefaultMod } from 'services/concent';
import Routes from './components/Routes';

function MainContent() {
  const { globalState, globalComputed } = useC2DefaultMod();
  const { contentLayoutStyle } = globalComputed;
  let uiContentArea: React.ReactElement = <EmptyView />;

  if (!globalState.isAppReady) {
    uiContentArea = <Layout style={{ ...contentLayoutStyle, padding: '64px' }}>
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Skeleton avatar paragraph={{ rows: 4 }} />
      <Spin>
        <div style={{ textAlign: 'center' }}>系统初始化中...</div>
      </Spin>
    </Layout>;
  } else {
    // 给一个最小高度，确保路由组件在异步加载过程中，Footer出现在底部
    uiContentArea = <div style={{ minHeight: 'calc(100vh - 120px)' }}><Routes /></div>;
  }
  return uiContentArea;
}

export default React.memo(MainContent);
