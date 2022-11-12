async function checkCdnBaseLibs() {
  // 极低的概率可能 cdn 服务请求异常：ERR_HTTP2_PROTOCOL_ERROR，导致 concent 库挂载失败
  // if (!window.Hub_Concent) {
  //   const { delay } = await import('./utils/timer');
  //   await delay(1000);
  // }

  // if (!window.Hub_Concent || !window.LEAH_React || !window.antd) {
  //   throw new Error('load base libs from cdn fail!');
  // }
}

async function main() {
  await checkCdnBaseLibs();
  // 启动 concent
  await import('./configs/runConcent');
  // app 上下文相关的预备工作
  const appContext = await import('./configs/appContext');
  appContext.extractCustomizedConfig();
  // 拉取基座的配置
  const rainbow = await import('./services/confCenter');
  const hubConfig = await rainbow.initHubConfig();

  // 初始化 icon 资源
  const { loadIconByUrl } = await import('./components/dumb/icons');
  loadIconByUrl(hubConfig.iconAssetsUrl);

  // 开始渲染整个应用
  await import('./loadApp');
}


main().catch((err) => {
  console.error(err);
  alert(`网络异常，可尝试刷新解决，err: ${err.message}`);
});

export const DESC = 'hel-react-app entry file';
