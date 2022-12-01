// pages/myself/myself.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    identity: "共产党员",
    jifen: "233",
    numbers: [],
  },

  goToMyOrganization: function (e) {
    wx.navigateTo({
      url: '/pages/myOrganization/myOrganization',
    })
  },

  gotoxuanshi: function () {
    wx.navigateTo({
      url: '/pages/xuanshi/xuanshi',
    })
  },
  goToScoreManagement: function (e) {
    wx.navigateTo({
      url: '/pages/scoreManagement/scoreManagement',
    })
  },

  goToAnswerSheet: function (e) {
    wx.navigateTo({
      url: '/pages/answerSheet/answerSheet',
    })
  },

  goToSetting: function (e) {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  getUserProfile() {
    if (!wx.getStorageSync('userInfo')) {
      var that = this
      wx.login({
        success(res) {
          //获取code
          console.log(res)
        }
      })
      wx.getUserProfile({
        desc: '用于完善个人信息',
        success: (res) => {
          console.log("已获得" + this.data.userInfo);
          wx.setStorageSync('userInfo', res.userInfo);
          setTimeout(function () {
            wx.showToast({
              title: '成功登录',
              duration: 2000
            })
          })
          that.onShow()
        },
        fail: res => {
          console.log(res)
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'error',
            duration: 2000
          });
          return;
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlOperation',
      data: {
        sql: "select number,name from student"
      },
      success: function (res) {
        console.log('已获得学生信息', res.result)
        that.setData({
          numbers: res.result,
          userInfo: wx.getStorageSync('userInfo') || null
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})