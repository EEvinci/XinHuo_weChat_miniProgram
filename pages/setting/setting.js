// pages/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        settings: [{
                title: "联系我们",
                image: "http://evinci.oss-cn-hangzhou.aliyuncs.com/evinci/我的-设置-联系我们.png"
            },
            {
                title: "隐私政策",
                image: "http://evinci.oss-cn-hangzhou.aliyuncs.com/evinci/我的-设置-隐私政策.png"
            },
            {
                title: "使用手册",
                image: "http://evinci.oss-cn-hangzhou.aliyuncs.com/evinci/我的-设置-使用手册.png"
            },
            {
                title: "关于我们",
                image: "http://evinci.oss-cn-hangzhou.aliyuncs.com/evinci/我的-设置-关于我们.png"
            },
            {
                title: "通用",
                image: "http://evinci.oss-cn-hangzhou.aliyuncs.com/evinci/我的-设置-通用.png"
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