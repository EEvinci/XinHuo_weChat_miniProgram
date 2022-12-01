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

    /* 云函数使用初始化 */
    wx.cloud.init({
      env: 'xinhuoyouchuang-4grdpztx44cc44f9',
      traceUser: true
    })
    if (!wx.cloud) {
      console.error('请使用2.2.3或以上的基础库以使用云功能')
    } else {
      wx.cloud.init({
        env: 'xinhuoyouchuang-4grdpztx44cc44f9',
        traceUser: true
      })
    }
    
  },
  /* 设置全局函数，并通过app.globalData.xxx来调用 */
  globalData: {
    userInfo: null,
    hasUserInfo: null
  },
  splieLine(list, line) {
    let num = Math.ceil(list.length / line),
      nlist = []
    for (let i = 0; i < num; i++) {
      nlist.push(list.splice(0, line))
    }
    return nlist
  }

})