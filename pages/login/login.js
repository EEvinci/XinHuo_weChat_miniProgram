Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
    },

    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },

    getUserProfile(e) {
        wx.login({
            success(res) {
                //获取code
                console.log(res)
            }
        })
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '用于完善个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                //获取用户信息
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                console.log("已获得" + this.data.userInfo);
                wx.setStorageSync('userInfo', res.userInfo);
                wx.switchTab({
                    url: '/pages/index/index',
                })
                console.log("已跳转")
            },
            fail: res => {
                console.log(res)
                //拒绝授权
                wx.showToast({
                    title: '您拒绝了授权',
                    icon: 'error',
                    duration: 2000
                });
                return;
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
})