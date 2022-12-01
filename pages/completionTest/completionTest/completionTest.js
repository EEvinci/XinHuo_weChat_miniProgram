var uuid = require('../../../utils/uuid.js')
var dateFormat = require('../../../utils/dateFormat_')
var str = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        paperid:'',
        student: [],
        /* 倒计时 */
        targetTime: 0,
        clearTimer: false,
        questionType: "单选题",
        questionList: [], // 题目列表
        index: 0, // 当前题目索引
        chooseValue: [],
        totalScore: 0,
        wrong: 0,
        title:null,
        object:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取题库-函数执行
        this.getQuestionList();
        this.setData({
            targetTime: new Date().getTime() + 60 * 60000
        });
        wx.enableAlertBeforeUnload({
            message: '你确定要退出么，我们不会保存你的答题记录',
            success: function (res) {
                console.log("成功：", res);
            },
            fail: function (err) {
                console.log("失败：", err);
            },
        })
    },

    /* 获取题库-函数定义 */
    getQuestionList() {
        var that = this
        wx.showLoading({
            title: '正在加载中，请稍候'
        });
        that.setData({
          paperid:wx.getStorageSync('paperid')
        })
        wx.cloud.callFunction({
            name: 'sqlOperation',
            data: {
                sql: "select * from exam_test_sheet where id = '"+that.data.paperid+"'"
            },
            success: function (res) {
                console.log('已获得考卷信息', res.result[0].content)
                str = res.result[0].content
                let obj1 = []
                let arr = str.split(";").map((item) => {
                    return JSON.parse(item)
                })
                let index = that.data.index
                obj1 = arr; //将arr赋值给数组
                that.setData({
                    questionList: obj1,
                    title: res.result[0].title,
                    type: res.result[0].type
                })
                console.log(that.data.questionList)
                wx.hideLoading();
            },
            fail: console.error
        })
    },

    /* 上一题 */
    /* beforeSubmit:function(){
        if (this.data.index > 0) {
            // 如果不是最后一题，则切换下一题
            let index = this.data.index - 1;
            this.setData({
                index
            })
        } else {
            // 如果是第一题，则提示
            wx.showToast({
                title: '已经是第一题了',
                icon: 'error',
                duration: 2000
            }) 
        }
    }, */

    /* 答题事件 */
    radioChange(e) {
        this.data.chooseValue[this.data.index] = e.detail.value;
    },

    /* 下一题 */
    nextSubmit: function () {
        // 如果没有选择
        if (this.data.chooseValue[this.data.index] == undefined || this.data.chooseValue[this.data.index].length == 0) {
            return wx.showToast({
                title: '请选择答案!',
                icon: 'none',
                duration: 2000
            })
        }

        // 判断所选择的选项是否为正确答案
        this.chooseJudge();

        // 判断是不是最后一题
        this.lastJudge();
    },

    /* 判断所选择的选项是否为正确答案 */
    chooseJudge() {
        var trueValue = this.data.questionList[this.data.index]['trueAnswer'];
        var chooseVal = this.data.chooseValue[this.data.index];
        if (chooseVal.toString() != trueValue.toString()) {
            // 答错则记录错题
            this.data.wrong++;
            /* this.data.wrongListSort.push(this.data.index);
            this.data.wrongList.push(this.data.questionList[this.data.index]._id); */
        } else {
            // 答对则累计总分
            this.setData({
                /* totalScore: this.data.totalScore + this.data.questionList[this.data.index]['scores'] */
                totalScore: this.data.totalScore + 20
            })
        }
    },

    /* 判断是不是最后一题 */
    lastJudge() {
        if (this.data.index < this.data.questionList.length - 1) {
            // 如果不是最后一题，则切换下一题
            let index = this.data.index + 1;
            this.setData({
                index
            })
        } else {
            // 如果是最后一题，则提交答卷
            this.addExamRecord()
        }
    },

    /* 提交答卷 */
    addExamRecord() {
        var that = this
        /* 完成了最后一题才能提交答卷 */
        if (this.data.chooseValue[that.data.questionList.length - 1] == undefined || this.data.chooseValue[that.data.questionList.length - 1].length == 0) {
            wx.showModal({
                title: '温馨提示',
                content: '你还有' + (that.data.questionList.length - that.data.index) + '题未提交，确定要现在退出考试么？',
                confirmColor: '#D8412B',
                success(res) {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '提交答卷中'
                        });
                        var randomuuid = uuid.wxuuid()
                        var nowTime = dateFormat.dateTimeFormat(new Date().getTime())
                        wx.cloud.callFunction({
                            name: 'sqlOperation',
                            data: {
                                sql: "insert into exam_answer_sheet(id, title, studentNumber, content, score, type, date) values('" + randomuuid + "', '" + that.data.title + "', '32001251', '" + str + "', '" + that.data.totalScore + "', '" + that.data.type + "', '" + nowTime + "') "
                            },
                            success: function (res) {
                                console.log('已添加到数据库中', res)
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                wx.hideLoading();
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: '../../testResults/testResults?id=' + randomuuid + "&stuNumber=" + JSON.stringify('32001251')
                                    });
                                })
                            },
                            fail: console.error
                        })
                    }
                }
            })
        } else {
            wx.showLoading({
                title: '提交答卷中'
            });
            // let examResult = {
            //     // wrongList: this.data.wrongList,
            //     wrong: this.data.wrong,
            //     // wrongListSort: this.data.wrongListSort,
            //     // chooseValue: this.data.chooseValue,
            //     totalScore: this.data.totalScore
            // };
            var randomuuid = uuid.wxuuid()
            var nowTime = dateFormat.dateTimeFormat(new Date().getTime())
            wx.cloud.callFunction({
                name: 'sqlOperation',
                data: {
                    sql: "insert into exam_answer_sheet(id, title, studentNumber, content, score, type, date) values('" + randomuuid + "', '浙大城市学院计算学院第43期积极分子考试', '32001251', '" + str + "', '" + that.data.totalScore + "', '入党积极分子', '" + nowTime + "') "
                },
                success: function (res) {
                    console.log('已添加到数据库中', res)
                    console.log(that.data.questionList.length)
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                    })
                    console.log("提交成功")
                    wx.hideLoading();
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '../../testResults/testResults?id=' + randomuuid + "&stuNumber=" + JSON.stringify('32001251')
                        });
                    })
                },
                fail: console.error
            })
        }

        // completionTestScores.add({
        //     data: {
        //         /* 把遍历的属性全部加进去 */
        //         studentNumber: this.data.student[0].number,
        //         studentName: this.data.student[0].name,
        //         ...examResult,
        //         createDate: new Date()
        //     }
        // }).then(res => {

        //     console.log(res._id)
        //     // 跳转到答题结果页，查看成绩
        //     wx.redirectTo({
        //         url: '../testResults/testResults?id=' + res._id
        //     });

        //     wx.hideLoading();
        // }) 
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
        this.setData({
            clearTimer: true
        });
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

    },
    /**
     * 定时器回调
     */
    countDownCallbackFn() {
        console.log("结束回调")
    }
})