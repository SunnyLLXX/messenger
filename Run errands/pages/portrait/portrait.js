import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
        name: '好学',
        max: 500
      },
      {
        name: '活泼',
        max: 500
      },
      {
        name: '温柔',
        max: 500
      },
      {
        name: '体贴',
        max: 500
      },
      {
        name: '可爱',
        max: 500
      },
      {
        name: '乐观',
        max: 500
      }
      ]
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
        value: [430, 340, 500, 300, 490, 400],
        name: '魅力值'
      },
      // {
      //   value: [300, 430, 150, 300, 420, 250],
      //   name: '开销'
      // }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
