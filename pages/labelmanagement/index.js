/*
 * @Description: file information
 * @Author: will
 * @Date: 2021-04-11 22:10:22
 * @LastEditors: will
 * @LastEditTime: 2021-04-12 17:25:48
 */

//Page Object
const App = getApp();
Page({
  data: {
    img_arr: [],
    reimg: [],
    datas: '',
    navState: 0,
    scimg: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    //搜索数据
    // getList(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
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
  },
  onLoad: function (options) {
    this.getFavorite();
    this.getRecommended();
  },
  getFavorite: function () {
    var that = this
    wx.request({
      url: 'http://192.168.31.45:9000/api/WXshuoshuo',
      header: {
        'Content-Type': 'application/json'
      },
      method: "get",
      success: function (res) {
        console.log("成功")
        console.log(res);
        that.setData({
          img_arr: res.data
        })
        console.log(res.data[0]);
      }
    })
  },
  getRecommended: function () {
    var that = this
    wx.request({
      url: 'http://192.168.31.45:9000/api/Wxfood',
      header: {
        'Content-Type': 'application/json'
      },
      method: "get",
      success: function (res) {
        console.log("成功")
        console.log(res);
        that.setData({
          reimg: res.data
        })
        // console.log(res.reimg);
      }
    })
  }
})