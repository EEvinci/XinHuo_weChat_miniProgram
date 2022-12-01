// pages/testTrain/testTrain.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        organizationRankingList: [{
                id: '1',
                name: '芯火优创1',
                score: 228
            },
            {
                id: '2',
                name: '芯火优创2',
                score: 227
            },
            {
                id: '3',
                name: '芯火优创3',
                score: 226
            },
            {
                id: '4',
                name: '芯火优创4',
                score: 225
            },
            {
                id: '5',
                name: '芯火优创5',
                score: 224
            },
            {
                id: '6',
                name: '芯火优创6',
                score: 223
            },
        ],
        schoolRankingList: [{
                id: '1',
                name: '芯火优创11',
                score: 328
            },
            {
                id: '2',
                name: '芯火优创22',
                score: 327
            },
            {
                id: '3',
                name: '芯火优创33',
                score: 326
            },
            {
                id: '4',
                name: '芯火优创44',
                score: 325
            },
            {
                id: '5',
                name: '芯火优创55',
                score: 324
            },
            {
                id: '6',
                name: '芯火优创66',
                score: 323
            },
        ]
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

    goToScoreManagement: function (event) {
        wx.navigateTo({
            url: '/pages/scoreManagement/scoreManagement',
        })
    },

    goToDailyTrain: function (e) {
        wx.navigateTo({
            url: '/pages/testTrain/dailyTrain/dailyTrain',
        })
    },

    goToSpecialTrain: function (e) {
        wx.navigateTo({
            url: '/pages/testTrain/specialTrain/specialTrain',
        })
    },

    goToWeeklyTrain: function (e) {
        wx.navigateTo({
            url: '/pages/testTrain/weeklyTrain/weeklyTrain',
        })
    },

    goToAnswerSheet() {
        wx.navigateTo({
            url: '/pages/answerSheet/answerSheet',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            /* 设置初始渲染的标签 */
            currentIndex: 0,
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