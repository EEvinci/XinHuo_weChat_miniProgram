var dateFormat = require('../../../utils/dateFormat_')
var dateRecords = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        specialList:[],
        dateList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTrainList()
    },

    getTrainList(){
        var that = this
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from pratice_test_sheet where type = '专项答题' order by date desc"
            },
            success: function (res) {
                console.log('已获得专项答题数据', res.result)
                res.result.forEach((element, index) => {
                    dateRecords[index] = dateFormat.dateFormat(element.date)
                });
                that.setData({
                    specialList: res.result,
                    dateList: dateRecords
                })
                console.log(that.data.specialList)
            },
            fail: console.error
        })
    },

    goToSpecialTrain(e){
      wx.setStorageSync('paperid', e.currentTarget.dataset.paperid);
        wx.navigateTo({
          url: '../specialTrain/specialTrainTest/specialTrainTest',
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