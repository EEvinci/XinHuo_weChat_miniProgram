// pages/login/login.js
/* 可以存放全局的变量 */
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: null,
        hasUserInfo: null,
        userImage: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.showModal({
            title: '温馨提示',
            content: '亲，授权微信登录后才能正常使用小程序功能',
            success(res) {
                console.log(res)
                //如果用户点击了确定按钮
                if (res.confirm) {
                    wx.getUserProfile({
                        desc: '获取你的昵称、头像、地区及性别',
                        success: res => {
                            app.globalData.userInfo = res.userInfo
                            app.globalData.hasUserInfo = true
                            that.setData({
                                userName: res.userInfo.nickName,
                                hasUserInfo: true,
                                userImage: res.userInfo.avatarUrl,
                            })
                            console.log(res);
                            console.log("已获得" + app.globalData.userInfo);
                            /* 保存到当地的缓存 */
                            wx.setStorageSync('key', res.userInfo);
                            wx.switchTab({
                                url: '/pages/index/index',
                            })
                            console.log("已跳转")
                        },
                        fail: res => {
                            console.log(res)
                            //拒绝授权
                            wx.showToast({
                                title: '访问连接有问题，需要注意网络通信',
                                icon: 'error',
                                duration: 2000
                            });
                            return;
                        }
                    });
                } else if (res.cancel) {
                    //如果用户点击了取消按钮
                    wx.showToast({
                        title: '您拒绝了请求,不能正常使用小程序',
                        icon: 'error',
                        duration: 2000
                    });
                    return;
                }
            }

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