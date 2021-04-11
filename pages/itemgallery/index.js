const app = getApp()
// var form_data;
// var psw_vaule = [];
Page({
  data: {
    tempFilePaths: [],
    img_arr: [],
    isSubmit: false,
    cname: "",
    add: "",
    chengfen: ""
  },
  // messageSubmit: function (e) {
  //   var that = this;
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  //   var that = this;
  //   var formData = e.detail.value;
  //   if (e.detail.value.canme == '' || e.detail.value.add == '' || e.detail.value.chengfen == '') {
  //     wx.showToast({
  //       title: '请填写完整',
  //     })
  //   } else {
  //     wx.request({
  //       url: 'http://192.168.31.45:9000/api/Upload1',//这里的接口请填实际接口     
  //       data: formData,
  //       header: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: "POST",
  //       success: function (res) {
  //         console.log("成功")
  //         // that.setData({
  //         //   form_info: ''
  //         // })
  //       }
  //     })
  //   }
  // },

  // console.log('form发生了submit事件，携带数据为：', e.detail.value);
  // let { cname, add, chengfen } = e.detail.value;
  // if (!cname || !add || !chengfen) {
  //   this.setData({
  //     warn: "菜名、添加食品或成分为空！",
  //     isSubmit: true
  //   })
  //   return;
  // }
  // this.setData({
  //   warn: "",
  //   isSubmit: true,
  //   cname,
  //   add,
  //   chengfen
  // })
  // 上传图片到服务器 
  formSubmit: function (e) {
    var that = this
    var adds = that.data.img_arr;
    console.log("上传");
    // console.log(adds);
    for (var i = 0; i < adds.length; i++) {
      // console.log(777);
      wx.uploadFile({
        url: 'http://192.168.31.45:9000/api/Upload2',
        filePath: that.data.img_arr[0],
        header: {
          'content-type': 'multipart/form-data',
          'token': wx.getStorageSync('token')
        },
        name: "file",
        formData: {
          'method': 'get',   //请求方式
          'user': adds
        },
        success: (res) => {
          console.log("成功")
          console.log('form发生了submit事件，携带数据为：', e.detail.value)
          var that = this;
          var formData = e.detail.value;
          if (e.detail.value.canme == '' || e.detail.value.add == '' || e.detail.value.chengfen == '') {
            wx.showToast({
              title: '请填写完整',
            })
          } else {
            wx.request({
              url: 'http://192.168.31.45:9000/api/Upload1',//这里的接口请填实际接口     
              data: formData,
              header: {
                'Content-Type': 'application/json'
              },
              method: "POST",
              success: function (res) {
                console.log("成功")
                // that.setData({
                //   form_info: ''
                // })
              }
            })
          }
        },
        fail: (err) => {
          console.log('error')
        }
      })
    }
  },
  // gotoPage: function () {
  //   wx.navigateTo({
  //     url: '/pages/shop/index',  //要跳转到的页面路径
  //   })
  // },
  //从本地获取照片 
  upimg: function () {
    var that = this;
    if (that.data.img_arr.length < 9) {
      wx.chooseImage({
        count: 9,        //最多上传九张图片   
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
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
  //删除照片功能与预览照片功能 
  deleteImg: function (e) {
    var that = this;
    var img_arr = that.data.img_arr;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          img_arr.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_arr: img_arr
        });
      }
    })
  },
  //预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var img_arr = this.data.img_arr;
    wx.previewImage({
      current: img_arr[index],
      urls: img_arr
    })
  },
})
