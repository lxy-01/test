import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],

    //导航 数组
    // catesList: []
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
    // this.getcatesList();
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
  //获取 分类导航数据
  // getcatesList() {
  //   request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
  //     .then(result => {
  //       this.setData({
  //         catesList: result.data.message
  //       })
  //     })
  // },

});
