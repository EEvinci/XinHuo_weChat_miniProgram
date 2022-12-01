// pages/themeLive/themeLive.js
var dateFormat = require('../../utils/dateFormat_') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { //滚动导航
      currentIndex: 0, //默认是活动项
      /* 轮播图 */
      indicatorDots: true,
      circular: true,
      autoplay: true,
      images: ['lunbo.png', "lunbo.png", "lunbo.png"]
    },
    /* 活动广场 */
    activityDataList: [],
    /* 融媒思政 */
    policyDataList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      /* 设置初始渲染的标签 */
      currentIndex: 0,
    })
    this.getactivityDataList(),
    this.getpolicyDataList()
  },

  getactivityDataList(){
    var that = this;
    wx.cloud.callFunction({
      name:'sqlOperation',
      data:{
        sql:"select * from article where type = '活动广场' order by time desc limit 3"
      },
      success: function (res) {
        //这里的res就是云函数的返回值
        for(var a=0;a<res.result.length;a++){
          res.result[a].time = dateFormat.dateFormat(res.result[a].time)
        }
        that.setData({
          activityDataList: res.result
        })
        console.log(that.data.activityDataList)
      },
      fail: console.error
    })
  },

  getpolicyDataList(){
    var that = this;
    wx.cloud.callFunction({
      name:'sqlOperation',
      data:{
        sql:"select * from article where type = '融媒思政' order by time desc limit 3"
      },
      success: function (res) {
        //这里的res就是云函数的返回值
        for(var a=0;a<res.result.length;a++){
          res.result[a].time = dateFormat.dateFormat(res.result[a].time)
        }
        that.setData({
          policyDataList: res.result
        })
      },
      fail: console.error
    })
  },

  // 切换swiper-item触发bindchange事件
  pagechange: function (e) {
    // 通过touch判断，改变tab的下标值
    if ("touch" === e.detail.source) {
      // 拿到当前索引并动态改变
      this.setData({
        currentIndex: e.detail.current,
      })
    }
  },

  //点击tab时触发
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
  },

  goToNews: function () {
    wx.switchTab({
      url: '../../pages/news/news',
    })
  },

  goToSign: function () {
    wx.navigateTo({
      url: '../../pages/clockInSignIn/clockInSignIn',
    })
  },

  goToScoreManagement: function () {
    wx.navigateTo({
      url: '../../pages/scoreManagement/scoreManagement',
    })
  },

  gotodetail(e){
    wx.setStorageSync('articleid', e.currentTarget.dataset.articleid)
    wx.navigateTo({
      url: '/pages/detail/news/news',
    })
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