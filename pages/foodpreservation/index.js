
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
      }
    })
  }
})