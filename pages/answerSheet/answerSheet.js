var dateFormat = require('../../utils/dateFormat_')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        testRecords: [],
        testTimes: [],
        practiceRecords: [],
        praticeTimes: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTestRecord()
        this.getPracticeRecord()
        this.setData({
            /* 设置初始渲染的标签 */
            currentIndex: 0,
        })
    },

    getTestRecord() {
        var that = this
        // 显示 loading 提示框
        wx.showLoading({
            title: '正在加载中，请稍候'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from exam_answer_sheet where studentNumber = '32001251' order by date desc"
            },
            success: function (res) {
                var a = []
                res.result.forEach((element, index) => {
                    a[index] = dateFormat.dateTimeFormat(element.date)
                });
                that.setData({
                    testRecords: res.result,
                    testTimes: a
                })
                console.log('已获得测试记录信息', that.data.testRecords)
                // 隐藏 loading 提示框
                wx.hideLoading();
            },
            fail: console.error
        })
    },

    getPracticeRecord() {
        var that = this
        // 显示 loading 提示框
        wx.showLoading({
            title: '正在加载中，请稍候'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from practice_answer_sheet where studentNumber = '32001251' order by date desc"
            },
            success: function (res) {
                var b = []
                res.result.forEach((element, index) => {
                    b[index] = dateFormat.dateTimeFormat(element.date)
                });
                that.setData({
                    practiceRecords: res.result,
                    praticeTimes: b
                })
                console.log('已获得答题记录信息', that.data.practiceRecords)
                // 隐藏 loading 提示框
                wx.hideLoading();
            },
            fail: console.error
        })
    },

    // 切换swiper-item触发bindchange事件
    pagechange: function (e) {
        if ("touch" === e.detail.source) {
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