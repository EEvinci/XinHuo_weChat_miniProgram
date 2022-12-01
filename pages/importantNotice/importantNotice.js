// pages/importantNotice/importantNotice.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messageList:[
            {id:'1',from:'芯火优创小助手',image:'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/1db21224-d3af-4dfe-ac31-6e80f89fcc94.png',detail:'加入我们"芯火优创的大家庭吧',isRead:false,unReadCount:4},
            {id:'2',from:'访客周报',image:'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/9bb19ee8-8a96-4b90-bba3-30247bd19b01.png',detail:'最近有4个人访问你的学习主页啦~快去看看他们是谁吧',isRead:true,unReadCount:0},
            {id:'3',from:'小组学习',image:'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/44945ea5-4895-45e5-aee5-b8ff16be611d.png',detail:'你加入的"芯火优创六人组有新的消息通知噢~"',isRead:true,unReadCount:0},
            {id:'4',from:'点赞消息',image:'https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/39ce9b54-ee28-495c-a491-9d5745ccf5a7.png',detail:'你发表的评论收到5人点赞噢',isRead:false,unReadCount:2},
        ],
    },

    readAll: function(e) {
        var that = this
        var num = this.data.messageList
        wx.showModal({
            title: '提示',
            content: '确定要设置全部消息已读么？',
            confirmColor:'#D8412B',//设置颜色
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    num.forEach(element => {
                        element.isRead = true
                        element.unReadCount = 0
                    });
                    that.setData({
                        messageList:num
                    })
                    wx.showToast({
                      title: '全部消息已读',
                      duration: 1000
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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