import React from 'react';
import { Chart } from '@antv/g2';


const getChart = (data: any, container: string) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 500,
  });
  chart.data(data);
  chart.axis(false);
  chart.legend({
    position: 'top',
  });
  chart.coordinate('rect').transpose();
  chart.tooltip({
    shared: true,
    showMarkers: false,
  });
  chart.interaction('active-region');
  chart
    .interval()
    .adjust('stack')
    .position('city*value')
    .color('type*city', (type, city) => {
      if (type === '城市人口') {
        return '#1890ff';
      }
      return '#c0c0c0';
    })
    .size(26);

  chart.render();

  return chart;
}


interface IProps {
  data: any[], height?: string, width?: string
}

export default function (props: IProps) {
  const chartInfo = React.useRef<{ ins: Chart | null }>({ ins: null });
  const containerId = React.useRef(`h_${Date.now()}`);

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
