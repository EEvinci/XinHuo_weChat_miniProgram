var dateFormat = require('../../../utils/dateFormat_')
var dateRecords = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        testList:[],
        testTime:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTestList()
    },

    getTestList(){
        var that = this
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from exam_test_sheet where hasDone = 0 order by testTime desc"
            },
            success: function (res) {
                console.log('已获得考试列表信息', res)
                res.result.forEach((element, index) => {
                    dateRecords[index] = dateFormat.dateTimeFormat(element.testTime)
                });
                //这里的res就是云函数的返回值
                that.setData({
                    testList: res.result,
                    testTime: dateRecords
                })
              },
              fail: console.error
        })
    },

    goTotest(e){
        wx.setStorageSync('paperid', e.currentTarget.dataset.paperid)
        wx.navigateTo({
          url: '../completionTest/completionTest',
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