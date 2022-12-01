const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0, //默认是活动项
        people:[],
        todayHistory:[],
        yearHistory:'',
        mydate:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPeople()
        this.getTodayHistory()
        this.setData({
            /* 设置初始渲染的标签 */
            currentIndex: 0,
        }) 
    },

    getPeople() {
        var that = this
        wx.cloud.callFunction({
          // 自己定义的云函数名称
          name: 'sqlOperation',
          // 传给云函数的参数
          data: {
            sql: "select * from great_man order by id"
          },
          success: function (res) {
            console.log('党史人物', res)
            //这里的res就是云函数的返回值
            that.setData({
                people: res.result
            })
            console.log(that.data.people)
          },
          fail: console.error
        })
    },

    getTodayHistory(){
        var that = this
        let today = new Date()
        let month = today.getMonth() + 1
        if(month < 10) month = '0' + month
        let day = today.getDate()
        let mydate = month + "月" + day + "日"
        wx.cloud.callFunction({
          // 自己定义的云函数名称
          name: 'sqlOperation',
          // 传给云函数的参数
          data: {
            sql: "select * from today_in_history where date = '"+ mydate + "'"
          },
          success: function (res) {
            console.log('党史上的今天', res)
            let year = res.result[0].content.slice(0,4)
            //这里的res就是云函数的返回值
            that.setData({
                todayHistory: res.result[0],
                yearHistory:year,
                mydate:mydate
            })
            console.log(that.data.todayHistory)
          },
          fail: console.error
        })
    },

    gotopeopledetail(e){
      wx.setStorageSync('peoplename', e.currentTarget.dataset.peoplename)
      wx.navigateTo({
        url: '/pages/detail/greatman/greatman',
      })
    },

    gotoperioddetail(e){
      wx.setStorageSync('period', e.currentTarget.dataset.period)
      wx.navigateTo({
        url: '/pages/detail/fourperiod/fourperiod',
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