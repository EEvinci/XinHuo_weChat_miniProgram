Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalNumber: 5,
        fullScore: 100,
        totalScore: null,
        studentName: '',
        wrong: 0,
        zql: null
    },

    toIndex: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 查看答题成绩
        this.getExamResult(options.id, options.stuNumber, options.wrong);
    },

    // 系统自动判分
    getExamResult(id, number, wrong) {
        var that = this
        wx.showLoading({
            title: '系统判分中'
        });
        wx.cloud.callFunction({
            // 自己定义的云函数名称
            name: 'sqlOperation',
            // 传给云函数的参数
            data: {
                sql: "select * from practice_answer_sheet where id = '" + id + "' and studentNumber = " + number
            },
            success: function (res) {
                console.log('已查询到当前答题情况', res)
                that.setData({
                    totalScore: res.result[0].score,
                    studentName: '许琮御',
                    wrong: wrong,
                    zql: (5 - wrong) / 5 * 100
                })
                wx.hideLoading()
            },
            fail: console.error
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