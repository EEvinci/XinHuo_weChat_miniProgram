var dateFormat = require('../../../utils/dateFormat_')
var a = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        news: [],
        newsTimes: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrganizationNews();
    },

    getOrganizationNews() {
        var that = this
        wx.showLoading({
            title: '正在加载中'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from organization_news order by time desc"
            },
            success: function (res) {
                console.log('组织资讯', res.result)
                res.result.forEach((element, index) => {
                    a[index] = dateFormat.dateTimeFormat(element.time)
                });
                that.setData({
                    news: res.result,
                    newsTimes: a
                })
                console.log(that.data.news)
                // 隐藏 loading 提示框
                wx.hideLoading();
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