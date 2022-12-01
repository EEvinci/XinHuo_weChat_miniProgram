Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchTitle: null,
    searchResult: null
  },

  /* 获取输入值 */
  bindSearchInput: function (e) {
    this.setData({
      searchTitle: e.detail.value
    })
  },

  searchBegin() {
    let that = this
    if (that.data.searchTitle == null) {
      wx.showToast({
        title: '请输入你要查询的内容',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      console.log(that.data.searchTitle)
      wx.cloud.callFunction({
        // 自己定义的云函数名称
        name: 'sqlOperation',
        // 传给云函数的参数
        data: {
          sql: "select * from article where title like '%" + that.data.searchTitle + "%'"
        },
        success: function (res) {
          if (res.result.length != 0) {
            console.log('已获得文章信息', res.result)
            //这里的res就是云函数的返回值
            that.setData({
              searchResult: res.result
            })
            console.log("已获取数据库", that.data.searchResult)
          } else {
            wx.showToast({
              title: '没有搜到和该内容匹配的文章',
              icon:'none',
              duration: 2000
            })
          }
        },
        fail: console.error
      })
    }

  },

  gotodetail(e){
    var that = this
    wx.setStorageSync('articleid', e.currentTarget.dataset.articleid),
    wx.navigateTo({
      url: '/pages/detail/news/news',
    })
  },

  hideInput: function () {
    //返回上一界面
    wx.navigateBack({
      delta: 0,
    })
  }
});