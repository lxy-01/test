/*
 * @Description: file information
 * @Author: will
 * @Date: 2021-03-12 21:21:19
 * @LastEditors: will
 * @LastEditTime: 2021-03-17 17:32:35
 */

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
