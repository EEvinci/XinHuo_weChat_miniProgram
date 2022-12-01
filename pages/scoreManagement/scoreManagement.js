var uuid = require('../../utils/uuid.js')
var dateFormat = require('../../utils/dateFormat_')
const app = getApp();
var dateRecords = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        title: ['荣誉积分', '积分兑换', '积分历史'],
        image: ['https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/7ba8cefb-77a6-47a9-9385-6e11291eae13.jpg', 'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/811319ab-402b-4e5a-9a25-86dd62c99fa0.jpg', 'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/edbb847d-7f2b-408e-b078-3c9ad47cb362.jpg'],
        totalScore: 223,
        storeList: [],
        records: [],
        recordsTime: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getStoreList();
        this.getRecordList();
        this.setData({
            /* 设置初始渲染的标签 */
            currentIndex: 0,
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

    /* 获取商城信息-函数定义 */
    getStoreList() {
        var that = this

        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select name, value, image from item_exchange"
            },
            success: function (res) {
                console.log('已查询出积分商城', res)
                that.setData({
                    storeList: res.result
                })
                console.log(that.data.storeList)
            },
            fail: console.error
        })
    },
    /* 获取历史记录-函数定义 */
    getRecordList() {
        var that = this

        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from gift_score_record where stuNumber = '32001251' order by time desc"
            },
            success: function (res) {
                console.log('已查询出当前学生的积分记录', res)
                res.result.forEach((element, index) => {
                    dateRecords[index] = dateFormat.dateFormat(element.time)
                });
                that.setData({
                    records: res.result,
                    recordsTime: dateRecords
                })
                console.log(that.data.records)
            },
            fail: console.error
        })

    },

    goToSign() {
        wx.navigateTo({
          url: '/pages/clockInSignIn/clockInSignIn',
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