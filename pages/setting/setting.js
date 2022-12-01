// pages/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        settings: [{
                title: "联系我们",
                image: "https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/85c773d3-4b5c-4465-9966-621d3e63bc68.png"
            },
            {
                title: "隐私政策",
                image: "https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/9d95c673-42ea-4fe7-859e-ec046e64bbaa.png"
            },
            {
                title: "使用手册",
                image: "https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/670bccca-cca3-4fc6-ba5a-5bb8c6a4c12f.png"
            },
            {
                title: "关于我们",
                image: "https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/745306b2-3bea-4b25-8644-4f04db19a4f2.png"
            },
            {
                title: "通用",
                image: "https://mp-2f529dfd-46b3-4957-8706-0cd1dbc461a5.cdn.bspapp.com/cloudstorage/f821433d-ecf4-4011-96e2-c3a9e190d07c.png"
            },
        ],

        flag: null
    },

    loginOut() {
        var that = this
        wx.showModal({
            content: '你确定要退出当前用户么？',
            confirmText: '退出',
            confirmColor: '#D8412B',
            success(res) {
                if (res.confirm) {
                    wx.setStorageSync('userInfo', null)
                    console.log("已清空当前用户信息")
                    that.onShow()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    getUserProfile() {
        var that = this
        wx.login({
            success(res) {
                console.log(res)
            }
        })
        wx.getUserProfile({
            desc: '用于完善个人信息',
            success: (res) => {
                wx.setStorageSync('userInfo', res.userInfo);
                setTimeout(function() {
                    wx.showToast({
                      title: '成功登录',
                      duration: 2000
                    })
                })
                that.onShow()
            },
            fail: res => {
                console.log(res)
                wx.showToast({
                    title: '您没有登录',
                    icon: 'error',
                    duration: 1000
                });
                return;
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
        console.log(wx.getStorageSync('userInfo'))
        if (wx.getStorageSync('userInfo')) {
            console.log(1)
            this.setData({
                flag: 1
            })
        } else {
            console.log(0)
            this.setData({
                flag: 0
            })
        }
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