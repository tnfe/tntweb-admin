import React from 'react';
import { Counter } from './Counter';
import { CounterTip } from './CounterTip';

export default () => {
  return (
    <div style={{ width: '3000px' }}>
      <Counter />
      <CounterTip />
    </div>
  );
};
