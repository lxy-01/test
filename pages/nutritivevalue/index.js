//获取应用实例
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

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
    navState: 0,
    ec: {
      onInit: initChart
    }
  },

  //监听滑块
  bindchange(e) {
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },

  //点击导航
  navSwitch: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },

  onLoad: function () {
    this.getFood();
  },

  //物品
  getFood: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.31.45:9000/api/NutritionalValue7',
      methods: "get",
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data,
        })
        console.log(res.data[0]);
      }
    })
  },
})
