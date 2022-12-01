// pages/detail/greatman/greatman.js
var dateFormat = require('../../../utils/dateFormat_') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peoplename:'',
    Article:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      peoplename:wx.getStorageSync('peoplename')
    })
    this.getPeople()
  },

  getPeople(){
    var that = this;
    wx.cloud.callFunction({
      name:'sqlOperation',
      data:{
        sql:"select * from article where title = '"+that.data.peoplename+"'"
      },
      success: function (res) {
        //这里的res就是云函数的返回值
        res.result[0].time = dateFormat.dateFormat(res.result[0].time)
        that.setData({
          Article: res.result
        })
        //console.log(that.data.Article)
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})