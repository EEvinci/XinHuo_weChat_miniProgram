var dateFormat = require('../../utils/dateFormat_')
var a = [];
var b = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        organization:null,
        news: [],
        newsTimes: [],
        meetings: [],
        meetingsTimes: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrganizationNews();
        this.getOrganizationMeetings();
        this.getOrganizationInfos();
    },

    getOrganizationInfos() {
        var that = this
        wx.showLoading({
            title: '正在加载中'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from student where number = '32001251'"
            },
            success: function (res) {
                console.log('所属支部', res.result)
                that.setData({
                    organization: res.result[0].organization
                })
                console.log(that.data.organization)
                // 隐藏 loading 提示框
                wx.hideLoading();
            },
            fail: console.error
        })
    },

    getOrganizationNews() {
        var that = this
        wx.showLoading({
            title: '正在加载中'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from organization_news order by time desc limit 2"
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

    getOrganizationMeetings() {
        var that = this
        wx.showLoading({
            title: '正在加载中'
        });
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from organization_meeting_record order by time desc limit 2"
            },
            success: function (res) {
                console.log('组织会议', res.result)
                res.result.forEach((element, index) => {
                    b[index] = dateFormat.dateFormat(element.time)
                });
                that.setData({
                    meetings: res.result,
                    meetingsTimes: b
                })
                console.log(that.data.meetings)
                // 隐藏 loading 提示框
                wx.hideLoading();
            },
            fail: console.error
        })
    },

    moreNews() {
        wx.navigateTo({
          url: '/pages/myOrganization/organizationNews/organizationNews',
        })
    },

    moreMeetings() {
        wx.navigateTo({
          url: '/pages/myOrganization/organizationMeetings/organizationMeetings',
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