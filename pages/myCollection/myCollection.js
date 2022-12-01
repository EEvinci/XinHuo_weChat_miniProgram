const app = getApp();
const db = wx.cloud.database();
const myCollectionNews = db.collection('myCollectionNews');
const myCollectionActivities = db.collection('myCollectionActivities');
const myCollectionTopics = db.collection('myCollectionTopics');
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        newsList:[],
        activitiesList:[],
        topicList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCollectionNews();
        this.getCollectionActivities();
        this.getCollectionTopics();
        this.setData({
            /* 设置初始渲染的标签 */
            currentIndex: 0,
        })
    },

    getCollectionNews(){
        wx.showLoading({
            title: '正在加载中，请稍候'
        });
        myCollectionNews.where({
            title: _.exists(true)
        })
        .get()
        .then(res => {
            console.log('[新闻收藏] [newsList] 查询成功')
            console.log(res.data)
            let data = res.data || [];
            

            this.setData({
                newsList:data
            });
            wx.hideLoading();
        })
    },

    getCollectionActivities(){
        wx.showLoading({
            title: '正在加载中，请稍候'
        });

        myCollectionActivities.where({

            title: _.exists(true)
        })
        .get()
        .then(res => {
            // 获取集合数据，或获取根据查询条件筛选后的集合数据。
            console.log('[活动收藏] [newsList] 查询成功')
            console.log(res.data)
            let data = res.data || [];
            
            this.setData({
                activitiesList:data
            });

            wx.hideLoading();
        })
    },

    getCollectionTopics(){
        wx.showLoading({
            title: '正在加载中，请稍候'
        });
        myCollectionTopics.where({
            title: _.exists(true)
        })
        .get()
        .then(res => {
            // 获取集合数据，或获取根据查询条件筛选后的集合数据。
            console.log('[题目收藏] [myCollectionTopics] 查询成功')
            console.log(res.data)
            let data = res.data || [];
            
            this.setData({
                topicList:data
            });

            // 隐藏 loading 提示框
            wx.hideLoading();
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