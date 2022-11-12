import React from 'react';
import { preFetchApp } from 'hel-micro';
import { SiderViewTypes } from 'configs/constant/sys';
import { EmptyView } from 'components/dumb/general';
import { useSetup } from 'services/concent';
import { CtxDe } from 'types/store';

interface IProps {
  appName?: string;
  extraData?: {
    appName: string,
    appGroupName: string,
    allowShadow: boolean,
    siderViewType: SiderViewTypes,
  };
  appProps?: string;
  [key: string]: any;
}

function setup(ctx: CtxDe<IProps>) {
  const getAppName = () => {
    let { appName } = ctx.props;
    // 用户未传递 appName 的话，优先从 extraData 里读取，然后从 pathname 上获取
    if (!appName) {
      const appNameInExtra = ctx.props.extraData?.appName;
      const [_, name] = window.location.pathname.split('/');
      if (appNameInExtra) appName = appNameInExtra;
      else appName = name;
    }
    return appName;
  };

  const ins = ctx.initState({
    SubApp: EmptyView,
  });

  ctx.effect(() => {
    // 访问当前子应用时，自定义了边栏显示设置
    const siderViewType = ctx.props.extraData?.siderViewType;
    if (siderViewType && ctx.globalState.siderViewType !== siderViewType) {
      ctx.setGlobalState({ siderViewType });
    }

    preFetchApp(getAppName()).then(emitApp => {
      if (emitApp) {
        ins.setState({ SubApp: emitApp.Comp })
      }
    });
  }, []);

  const settings = {
    ins,
  };

  return settings;
}

export function SubAppLoader(props: IProps) {
  const { ins } = useSetup(setup, { props });
  const { SubApp } = ins.state;
  return <SubApp />;
}

SubAppLoader.displayName = 'SubAppLoader';

export default SubAppLoader;
