  // 以下时间
  function splitTime(time) {
    var now = new Date().getTime(),
      target = new Date(time).getTime(),
      dis = target - now,
      hour, min, sec
    if (dis <= 0) return {
      code: 1,
      data: "活动已经开始"
    }
    hour = parseInt(dis / 1000 / 60 / 60)
    min = parseInt((dis - hour * 60 * 60 * 1000) / 1000 / 60)
    sec = parseInt((dis - hour * 60 * 60 * 1000 - min * 1000 * 60) / 1000)
    return {
      code: 0,
      data: {
        hour: (hour + "").length == 1 ? "0" + hour : hour,
        min: (min + "").length == 1 ? "0" + min : min,
        sec: (sec + "").length == 1 ? "0" + sec : sec,
      }
    }
  }

  // 以上时间
  var setTime = "2020/12/02 18:00:00"
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      time: '12:01',
      region: ['宁夏回族自治区', '银川市', '西夏区'],
      loading: true,

      timeDown: setTime,
      timeShow: splitTime(setTime).data,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      var to = that.data.timeShow

      function updateTime(cbk) {
        var curTime = splitTime(that.data.timeDown)
        if (curTime.code) {
          clearTimeout(to);
          cbk && cbk(curTime.data);
          return
        }
        var {
          hour,
          min,
          sec,
        } = curTime.data

        setTimeout(function () {
          that.setData({
            "timeShow.sec": sec,
            "timeShow.min": min,
            "timeShow.hour": hour
          })
        }, 500)

        to = setTimeout(function () {
          updateTime(cbk)
        }, 1000)
      }
      // 开启计时
      updateTime(function (info) {
        wx.showToast({
          title: info,
          icon: 'success',
          duration: 2000
        })
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

    },

    // 时间选择
    TimeChange(e) {
      this.setData({
        time: e.detail.value
      })
    },
    // 地址选择
    RegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
    },




  })