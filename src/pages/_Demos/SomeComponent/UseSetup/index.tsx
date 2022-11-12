import React from 'react';
import { Card } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import UseSteup from 'components/_demos/UseSteup';

function DemoPageTodoList(props: RouteComponentProps) {
  console.warn('DemoPageTodoList');
  return (
    <Card>
      <UseSteup />
    </Card>
  );
}

export default React.memo(DemoPageTodoList);
