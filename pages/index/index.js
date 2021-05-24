import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    result:''
  },
  //options(Object)
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // })

    this.getSwiperList();
  },

  //获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 获取扫一扫
  getScancode:function(){
    var that=this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var result = res.result;
        that.setData({
          result: result,
        })
      }
    })
  }
});
