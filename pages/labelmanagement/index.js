/*
 * @Description: file information
 * @Author: will
 * @Date: 2021-03-16 19:57:08
 * @LastEditors: will
 * @LastEditTime: 2021-04-01 16:44:29
 */
import * as echarts from '../../ec-canvas/echarts'
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        normal: {
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
              '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
              '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            ];
            return colorList[params.dataIndex]
          },
        }
      }
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
  onload: function () {

  },
})
