import React from 'react';
import { Chart } from '@antv/g2';


const getChart = (data: any, container: string) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 500
  });
  // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
  chart.data(data);
  chart.axis(false);
  chart.scale({
    height: { nice: true },
    weight: { nice: true },
  });
  chart.tooltip({
    showTitle: false,
    showCrosshairs: true,
    crosshairs: {
      type: 'xy',
    },
    itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
      + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
      + '{name}<br/>'
      + '{value}'
      + '</li>'
  });
  chart
    .point()
    .position('height*weight')
    .color('gender')
    .shape('circle')
    .tooltip('gender*height*weight', (gender, height, weight) => {
      return {
        name: gender,
        value: height + '(cm), ' + weight + '(kg)'
      };
    })
    .style({
      fillOpacity: 0.85
    });
  chart.interaction('legend-highlight');
  chart.render();

  return chart;
}


interface IProps {
  data: any[], height?: string, width?: string
}

export default function (props: IProps) {
  const chartInfo = React.useRef<{ ins: Chart | null }>({ ins: null });
  const containerId = React.useRef(`s_${Date.now()}`);
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
