
//获取应用实例
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    datas: '',
    navState: 0,
    ec: {
      lazyLoad: true,
    },
  },

  //监听滑块
  bindchange(e) {
    // console.log(e);
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },

  //点击导航
  navSwitch: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
    this.initChart();
  },

  onLoad: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData();  // 这里注意getData 要始终保持在initChart 之前  我们需要通过getData 对 page 下 data 里的 datas 进行赋值 ， 否则取出的数据将会是无效数据
    this.getFood();


  },


  getData: function () {
    var that = this
    wx.request({
      url: 'http://192.168.31.45:9000/api/NutritionalValue1',  // 这里 url 换一下
      method: 'get',  // 这个 改成 get
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        // console.log("打印");
        // console.log(res.data);
        this.setData({    // 通过setData 对  Page 里面得 datas 赋值
          datas: res.data
        })
        console.log(1);
        console.log(res.data);
      }
    });
  },
  //初始化图表
  initChart: function () {
    var that = this
    // this.echartsComponnet = this.selectComponent('#mychart');
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      return Chart;
    });
  },
  getOption: function () {
    var that = this
    var dt = []
    // console.log("接口返回数据处理前：");
    // console.log(this.data.datas);
    for (let i in this.data.datas) {   // 这里取出之前调用接口取出得数据 
      dt.push(this.data.datas[i]);  // 原本得数据是 key ： value 格式  这里转成 纯数字数组  即[1,2,3,4,5,6,]
    }
    // dt.pop()
    // console.log("接口返回数据处理后：");
    // console.log(dt);

    // var legendList = []
    // legendList.push()
    // 指定图表的配置项和数据
    var option = {
      tooltip: {},
      // legend: {
      //   show: true,
      //   data: ['销量'],
      //   top: 2,
      //   icon: 'rect',
      //   textStyle: {
      //     color: '#1a1a1a',
      //   }

      // },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ["卡路里", "碳水化合物", "维E", "维C", "钙", "膳食纤维", "维A"],
        axisLabel: {
          interval: 0,
          rotate: 45, //代表逆时针旋转45度
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        // name: '销量',
        data: dt,   // 这里得data只支持 纯数字数组  即[1,2,3,4,5,6,] 所以前面需要进行转换
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
    }
    return option;
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
        // console.log(res.data[0]);
      }
    })
  },
})
