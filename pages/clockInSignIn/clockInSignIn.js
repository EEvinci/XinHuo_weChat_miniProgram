// pages/clockInSignIn/clockInSignIn.js
var util = require('../../utils/util.js');
var uuid = require('../../utils/uuid.js')
var dateFormat = require('../../utils/dateFormat_')

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        days: [], // days他这里表示日期，属性 isSign==true 的就是已签到的，那我就把days放1-31（含空白格子 +  当前月份 日子数），days_sign_up放对应个数的-1，如果有日期签到，就把对应的days_sign_up置0 or 1，根据数据库中我存储的 state而修改
        days_sign_up: [],
        signUp: [],
        cur_year: 0,
        cur_month: 0,
        count: 0
    },

    // 获取当月共多少天
    getThisMonthDays: function (year, month) {
        return new Date(year, month, 0).getDate()
    },

    // 获取当月第一天星期几
    getFirstDayOfWeek: function (year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },

    // 计算当月1号前空了几个格子，把它填充在days数组的前面
    calculateEmptyGrids: function (year, month) {
        var that = this;
        //计算每个月时要清零
        that.setData({
            days: [],
            days_sign_up: []
        });
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        let days = that.data.days
        let days_sign_up = that.data.days_sign_up
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                days.push(0);
                days_sign_up.push(-1)
            }
            this.setData({
                days: days,
                days_sign_up: days_sign_up
            });
            //清空
        } else {
            this.setData({
                days: [],
                days_sign_up: []
            });
        }
    },

    // 绘制当月天数占的格子，并把它放到days数组中
    calculateDays: function (year, month) {
        var that = this;
        const thisMonthDays = this.getThisMonthDays(year, month);
        let days = that.data.days
        let days_sign_up = that.data.days_sign_up
        for (let i = 1; i <= thisMonthDays; i++) {
            days.push(i);
            days_sign_up.push(-1)
        }
        this.setData({
            days: days,
            days_sign_up: days_sign_up
        });
    },

    // 切换控制年月，上一个月，下一个月
    handleCalendar: function (e) {
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }
            // 切换年月后 一定要先设置this的数据 再运行别的函数 否则会有冲突
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
            this.calculateEmptyGrids(newYear, newMonth);
            this.calculateDays(newYear, newMonth);
            this.onGetSignUp();
        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
            this.calculateEmptyGrids(newYear, newMonth);
            this.calculateDays(newYear, newMonth);
            this.onGetSignUp();
        }
    },
    //获取当前用户的考勤数组并匹配那些日子打卡
    onGetSignUp: function () {
        var that = this
        var days = this.data.days
        var days_sign_up = this.data.days_sign_up
        var cur_year = this.data.cur_year
        var cur_month = this.data.cur_month
        var count = 0
        wx.cloud.callFunction({
            // 自己定义的云函数名称
            name: 'sqlOperation',
            // 传给云函数的参数
            data: {
                sql: "select DISTINCT date from sign_in_record where stuNumber = '32001251'"
            },
            success: function (res) {
                console.log('已获得当前学生打卡签到信息', res.result)
                /* let t_date = res.result
                console.log(t_date.length)
                for (let i = 0; i < t_date.length; i++) {
                    let year = parseInt(t_date[i].date.substring(0, 4))
                    let month = parseInt(t_date[i].date.substring(5, 7))
                    let day = parseInt(t_date[i].date.substring(8, 10))
                    for (let j = 0; j < days.length; j++) {
                        if (year == cur_year && month == cur_month && day == days[j]) {
                            console.log("当前已打卡");
                            days_sign_up[j] = 1
                            count = count + 1
                        }
                    }
                } */
                /* 解决时区问题 */
                var a = []
                res.result.forEach((element, index) => {
                    a[index] = dateFormat.dateFormat(element.date)
                });
                for (let i = 0; i < a.length; i++) {
                    let year = parseInt(a[i].substring(0, 4))
                    let month = parseInt(a[i].substring(5, 7))
                    let day = parseInt(a[i].substring(8, 10))
                    for (let j = 0; j < days.length; j++) {
                        if (year == cur_year && month == cur_month && day == days[j]) {
                            days_sign_up[j] = 1
                            count = count + 1
                        }
                    }
                }
                that.setData({
                    days: days,
                    days_sign_up: days_sign_up,
                    count: count
                })
            },
            fail: console.error
        })
    },

    signInToday: function (e) {
        var that = this
        var randomuuid = uuid.wxuuid()
        /* 获取当前事件 */
        var nowTime = dateFormat.dateFormat(new Date().getTime())
        let todayIsSign = 0
        console.log(randomuuid)
        console.log(nowTime)
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from sign_in_record where date = '" + nowTime + "' limit 1"
            },
            success: function (res) {
                if (res.result[0]) {
                    wx.showToast({
                        title: '你今天已经签到过啦',
                        icon: 'none',
                        duration: 2000
                    })
                    todayIsSign = 1
                    console.log('今天已打卡', res)
                }
                if (todayIsSign == 0) {
                    wx.cloud.callFunction({
                        name: 'sqlOperation',
                        data: {
                            sql: "insert into sign_in_record(id,stuNumber,date) values ('" + randomuuid + "', '32001251', '" + nowTime + "')"
                        },
                        success: function (res) {
                            console.log('已添加到数据库中', res)
                            wx.showToast({
                                title: '签到成功',
                                icon: 'success',
                                duration: 2000
                            })
                            console.log("签到成功")
                        },
                        fail: console.error
                    })
                    /* 增加该用户的积分 */
                    wx.cloud.callFunction({
                        // 自己定义的云函数名称
                        name: 'sqlOperation',
                        // 传给云函数的参数
                        data: {
                            sql: "insert into gift_score_record(id,stuNumber,action,time,value) values ('" + randomuuid + "', '32001251', '打卡签到', '" + nowTime + "', 1)"
                        },
                        success: function (res) {
                            console.log('已添加到数据库中', res)
                            console.log("添加积分成功")
                        },
                        fail: console.error
                    })
                    that.onLoad()
                    console.log("已刷新")
                }
            },
            fail: console.error
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        console.log(cur_year);
        console.log(cur_month);
        // console.log(parseInt("04"));
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        this.setData({
            cur_year: cur_year,
            cur_month: cur_month,
            weeks_ch
        })
        // 计算当月1号前面应该空的格子数
        this.calculateEmptyGrids(cur_year, cur_month);
        // 计算天数
        this.calculateDays(cur_year, cur_month);
        // //获取当前用户当前任务的签到状态
        this.onGetSignUp();
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