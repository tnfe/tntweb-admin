import React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { useSetupCtx } from 'services/concent';
import { history } from 'react-router-concent';
import { CtxDe } from 'types/store';
import { path2menuItem } from 'configs/derived/menus';
import { NormalBlank, EmptyView } from 'components/dumb/general';

const { TabPane } = Tabs;
const stBreadWrap = { display: 'inline-block', verticalAlign: 'top', paddingLeft: '16px', lineHeight: '32px', backgroundColor: 'white', minWidth: '160px' };


function setup(ctx: CtxDe) {
  return {
    onChange: (curActiveRoutePath: string) => {
      ctx.setGlobalState({ curActiveRoutePath });
      history.push(curActiveRoutePath);
    },
    onEdit: async (targetPath: React.MouseEvent | React.KeyboardEvent | string, action: string) => {
      if (action === 'remove' && typeof targetPath === 'string') {
        const ret = await ctx.gr.delActiveRoutePath(targetPath);
        history.push(ret.curActiveRoutePath);
      }
    },
  }
}

// 渲染导航面包屑 + 标签页
function TipHeader() {
  let uiTipHeader: React.ReactElement = <EmptyView />;
  const { globalState, settings } = useSetupCtx(setup, { tag: 'TipHeader' });
  const menuItem = path2menuItem[globalState.curActiveRoutePath];
  if (!menuItem) return uiTipHeader;
  const { showBreadcrumb } = menuItem;
  if (!showBreadcrumb) return uiTipHeader;

  return (
    <div className="pageTabWrap">
      <Breadcrumb style={stBreadWrap}>
        {globalState.navMenus.map((item, i) => {
          const uiIcon = item.Icon ? <item.Icon /> : '';
          return <Breadcrumb.Item key={i}>{uiIcon}<NormalBlank />{item.label}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      <Tabs
        style={{ paddingLeft: '32px', display: 'inline-block' }}
        activeKey={globalState.curActiveRoutePath}
        hideAdd
        onChange={settings.onChange}
        onEdit={settings.onEdit}
        type="editable-card"
      >
        {globalState.activeRoutePaths.map(path => <TabPane tab={path2menuItem[path].label} key={path} />)}
      </Tabs>
    </div>
  );
}

export default React.memo(TipHeader);
