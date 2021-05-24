/*
 * @Description: file information
 * @Author: will
 * @Date: 2021-04-11 22:10:22
 * @LastEditors: will
 * @LastEditTime: 2021-04-13 11:37:53
 */

//食品生鲜
Page({
  data: {
  },

  onLoad: function (options) {
    this.getFood();
  },

  getFood: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.31.45:9000/api/GetFridgeFoodList',
      method: "post",
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data,
        })
        console.log(res.data[0])
        console.log(res.data.length);
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].reservedate > 15) {
            wx.showModal({
              title: '提示',
              content: '有食物存放天数太久，请及时处理',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else {
                  console.log('用户点击取消')
                }
              }
            })
            break;
          }
        }
      }
    })
  },
  // getTips: function () {
  //   wx.showModal({
  //     title: '提示',
  //     content: '有食物存放天数太久，请及时处理',
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // }
})