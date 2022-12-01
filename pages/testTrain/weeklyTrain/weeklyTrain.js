var monthList = []
var questions = []
var a =[]
var b = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        trainList:[],
        monthTitles:[],
        countList:[],
        cnt0:0,
        cnt1:1,
        cnt2:2,
        cnt3:3,
        cnt4:4,
        cnt5:5,
        cnt6:6,
        cnt7:7,
        cnt8:8,
        cnt9:9,
        cnt10:10,
        cnt11:11,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /* 每次进入都需要初始化 */
        a=[]
        b=[]
        questions=[]
        monthList=[]
        this.getWeeklyTrain()
    },

    getWeeklyTrain(){
        var that = this
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from pratice_test_sheet where type = '每周答题' order by date desc"
            },
            success: function (res) {
                console.log('已查询每周答题数据', res.result)
                res.result.forEach((element, index) => {
                    let topush = element.title.slice(5,7)
                    console.log(topush)
                    if(monthList.indexOf(topush) === -1){
                        monthList.push(topush)
                    }
                    a.push(topush)
                    questions.push({'id': element.id, 'month': topush, 'title': element.title, 'date': element.date, 'content': element.content, 'type': element.type})
                });
                monthList.forEach(element => {
                    b.push(a.lastIndexOf(element))
                })
                that.setData({
                    monthTitles:monthList,
                    trainList:questions,
                    countList:b
                })
                console.log("最后列表为",that.data.countList)
                console.log("答题列表为",that.data.trainList)
                console.log("时间列表为",that.data.monthTitles)
            },
            fail: console.error
        })
        
    },

    goToWeeklyTrain(e){
        wx.setStorageSync('paperid', e.currentTarget.dataset.paperid);
        wx.navigateTo({
          url: '../weeklyTrain/weeklyTrainTest/weeklyTrainTest',
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