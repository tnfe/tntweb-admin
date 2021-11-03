import React from 'react';
import { Chart } from '@antv/g2';


const getChart = (data: any, container: string) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 500,
  });

  chart.data(data);
  chart.scale({
    value: {
      min: 10000,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  });
  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });
  chart.axis(false);

  chart.area().position('year*value');
  chart.line().position('year*value');
  chart.render();

  return chart;
}


interface IProps {
  data: any[], height?: string, width?: string
}

export default function (props: IProps) {
  const chartInfo = React.useRef<{ ins: Chart | null }>({ ins: null });
  const containerId = React.useRef(`${Date.now()}`);
  console.log(`containerId.current ${containerId.current}`);

  React.useEffect(() => {
    let ins = chartInfo.current.ins;
    if (!ins) {
      ins = getChart(props.data, containerId.current);
      chartInfo.current.ins = ins;
    } else {
      ins.changeData(props.data);
    }
  }, [props.data]);
  React.useEffect(() => {
    let ins = chartInfo.current.ins;
    return () => { ins && ins.destroy() };
  }, []);
  return <div id={containerId.current} style={{ width: props.width || '100%', height: props.height || '100px' }}></div>
}
