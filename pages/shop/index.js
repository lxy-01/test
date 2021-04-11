// pages/shop/index.js
const app=getApp()
Page({
  data: {
    tempFilePaths:[],
    img_arr:[]
  },

  onLoad: function (options) {
  },
  //从本地获取照片 
  upimg: function () {
    var that = this;
    if (that.data.img_arr.length < 9) {
      wx.chooseImage({
        count: 9,        //最多上传九张图片   
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // console.log(res)
          console.log("添加成功");
          const tempFilePaths = res.tempFilePaths
          console.log(res.tempFilePaths)
          //concat() 方法用于连接两个或多个数组
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传九张图片',
        icon: 'loading',
        duration: 1000
      })
    }
  },
})