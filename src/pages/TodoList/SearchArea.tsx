

import React from 'react';
import { Input, Button } from 'antd';
import { useModel } from './model/meta';

function SearArea() {
  const { sync, syncer, state, mr } = useModel();
  return (
    <div>
      <Input onChange={sync('keyword')} value={state.keyword} />
      <Input onChange={syncer.keyword} value={state.keyword} />
      <span id="bigValue">{state.bigValue}</span>
      <Button id="addBigBtn" onClick={mr.addBig} />
    </div>
  );
}

export default React.memo(SearArea);
