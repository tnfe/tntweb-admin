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
  chart.scale('value', {
    alias: '销售额(万)',
    nice: true,
  });

  // chart.tooltip({
  //   showMarkers: false
  // });
  chart.interaction('active-region');

  chart.interval().position('time*value')
    .style('time', val => {
      if (val === '13:00-14:00') {
        return {
          fillOpacity: 0.4,
          lineWidth: 1,
          stroke: '#636363',
          lineDash: [3, 2]
        }
      }
      return {
        fillOpacity: 1,
        lineWidth: 0,
        stroke: '#636363',
        lineDash: [3, 2]
      };
    });

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
