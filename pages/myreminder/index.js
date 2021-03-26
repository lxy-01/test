//获取应用实例
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    // 默认数据
    date01: '2021-03-01',
    date02: '2021-03-02',
    //折现属性
    series: [{
      data: ([]),    
      name: '温度',
      smooth: false,
      type: 'line'
    }, {
      data: ([]),       
      name: '湿度',
      smooth: false,
      type: 'line'
    }],
    // 默认7天
    ascissaData: ([]).reverse(),     
    ec: {
      lazyLoad: true
    }
  },

  onLoad: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.init_echarts();
    this.getChartData();
  },

  // 日期选择器
  bindDateChange01: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date01: e.detail.value
    })
  },
  bindDateChange02: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date02: e.detail.value
    })
  },

  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  // 获取数据
  getOption: function () {
    var that = this
    console.log(that.data.series)  //打印的是温湿度
    // console.log(that.data.ascissaData)    //打印的是时间
    var legendList = []
    for (var i in that.data.series) {
      var obj = {
        name: that.data.series[i].name,
        icon: 'circle',
        textStyle: {
          color: '#000000',
        }
      }
      legendList.push(obj)

      that.data.series[i].data.reverse()
    }
    var option = {
      // 折线图线条的颜色
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      // 折线图的线条代表意义
      legend: {
        itemWidth: 5, //小圆点的宽度
        itemGap: 25,
        selectedModel: 'single', //折线可多选
        inactiveColor: '#87CEEB',
        data: legendList,
        bottom: 0,
        left: 30,
        z: 100
      },
      // 刻度
      grid: {
        containLabel: false
      },
      // 悬浮图标
      tooltip: {
        show: true,
        trigger: 'axis',
        position: function (pos, params, dom, rect, size) {
          var obj = {
            top: 60
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.ascissaData,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: { //y轴坐标是否显示
          show: false
        },
        axisTick: { //y轴刻度小标是否显示
          show: true
        }
      },
      series: that.data.series
    }
    return option
  },

  // 获取折线图数据
  getChartData: function () {
    var that = this
    console.log(that.data.date01, that.data.date02)  //输出当前的日期
    wx.request({
      url: 'http://192.168.31.45:9000/datas/list_tem_hum',
      data: {
        begin_data:"2021-03-02",
        end_data:"2021-03-03"
      },
      method:"post",
      header: {
        'content-type': 'application/json',
        // 'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data
        that.setData({
          'series[0].data': res.data.list_hum,
          'series[1].data': res.data.list_temp,
          ascissaData: res.data.list_data //默认横坐标
        })
        that.init_echarts()
      }
    })
  }
})