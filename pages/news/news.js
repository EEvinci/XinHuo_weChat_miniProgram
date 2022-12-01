// pages/news/news.js
var dateFormat = require('../../utils/dateFormat_') 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    party_member_index:'',
    Article:[],
    PartyMember:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中',
    })
    this.getArticle(),
    this.getPartyMember(),
    this.setData({
      currentIndex: 0,
      party_member_index:0
    })
    wx.hideLoading()
  },

  getArticle(){
    var that = this;
    wx.cloud.callFunction({
      name:'sqlOperation',
      data:{
        sql:"select * from article order by time desc"
      },
      success: function (res) {
        //这里的res就是云函数的返回值
        for(var a=0;a<res.result.length;a++){
          res.result[a].time = dateFormat.dateFormat(res.result[a].time)
        }
        that.setData({
          Article: res.result
        })
        //console.log(that.data.Article)
      },
      fail: console.error
    })
  },

  getPartyMember(){
    var that = this;
    wx.cloud.callFunction({
      name:'sqlOperation',
      data:{
        sql:"select * from article where type = '党员风采' order by time"
      },
      success: function (res) {
        //这里的res就是云函数的返回值
        for(var a=0;a<res.result.length;a++){
          res.result[a].time = dateFormat.dateFormat(res.result[a].time)
        }
        that.setData({
          PartyMember: res.result
        })
        console.log(that.data.party_member_index)
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

  gotodetail(e){
    wx.setStorageSync('articleid', e.currentTarget.dataset.articleid)
    wx.navigateTo({
      url: '/pages/detail/news/news',
    })
  },

  //党员风采上下页切换
  Prev:function(){
    if(this.data.party_member_index>0){
      this.setData({
        party_member_index:this.data.party_member_index-1
      })
    }
    else{
      this.setData({
        party_member_index:this.data.PartyMember.length-1
      })
    }
  },
  Next:function(){
    if(this.data.party_member_index<this.data.PartyMember.length-1){
      this.setData({
        party_member_index:this.data.party_member_index+1
      })
    }
    else{
      this.setData({
        party_member_index:0
      })
    }
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