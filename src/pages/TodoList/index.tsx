import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'antd';
import { ctxOn } from 'services/concent';
import * as ev from 'configs/constant/event';
import { useModelWithSetup, CtxPre } from './model/meta';
import ListArea from './ListArea';
import SearchArea from './SearchArea';

export function setup(ctx: CtxPre) {
  const on = ctxOn(ctx);
  on(ev.someEvent, (p1) => {
    console.log('move mouse pointer to p1 to see type: number');
  });

  return {
    hiThere() {
      return 'hiThere';
    },
    changeBigTo(to: number) {
      ctx.setState({ bigValue: to });
    },
  };
}

function DemoPageTodoList(props: RouteComponentProps) {
  const { moduleComputed, state } = useModelWithSetup(setup, { tag: 'Dpt' });

  return (
    <div>
      <Alert message={moduleComputed.formattedInput} />
      <h1 id="bigValue">{state.bigValue}</h1>
      <SearchArea />
      <ListArea />
    </div>
  );
}

export default React.memo(DemoPageTodoList);
