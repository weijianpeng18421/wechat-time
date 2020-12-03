  // 以下时间
  function splitTime(time) {
    var now = new Date().getTime(),
      target = new Date(time).getTime(),
      dis = target - now,
      hour, min, sec
    if (dis <= 0) return {
      code: 1,
      data: "结束"
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
  var util = require("../../utils/util.js")
  // var TIME = util.formatTime(new Date());
  // console.log(TIME)
  var setTime = "2020/12/02 18:00:00"
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      timeStart: '09:00',
      allStartTime: '09:00',
      timeEnd: '18:00',
      allEndTime: '18:00',
      region: ['宁夏回族自治区', '银川市', '西夏区'],
      timeShow: null,
      percentStart: 70,
      percentEnd: 30
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      var start = util.formatTime(new Date()).substring(0, 11) + '09:00';
      that.setData({
        allStartTime: start
      })

      var end = util.formatTime(new Date()).substring(0, 11) + '18:00';
      that.setData({
        allEndTime: end
      })

      that.BeginTimeDown()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 确认修改
    ConfigFixedTime: function () {
      var that = this
      that.BeginTimeDown()
    },
    // 取消修改
    CancelFixedTime: function () {

    },

    // 时间选择
    TimeChange(e) {
      var that = this
      let type = e.target.dataset.type
      if (type == "timeStart") {
        that.setData({
          timeStart: e.detail.value
        })

        var start = util.formatTime(new Date()).substring(0, 11) + e.detail.value;
        that.setData({
          allStartTime: start
        })
      } else if (type == "timeEnd") {
        that.setData({
          timeEnd: e.detail.value
        })
        var end = util.formatTime(new Date()).substring(0, 11) + e.detail.value;
        that.setData({
          allEndTime: end
        })

      } else {
        wx.showModal({
          title: '错误提示',
          content: '时间选择错误',
          showCancel: false,
        })
      }

    },
    // 地址选择
    RegionChange: function (e) {
      var that = this
      console.log("---------地址：", e)
      that.setData({
        region: e.detail.value
      })
    },
    // 开始倒计时
    BeginTimeDown: function () {
      var that = this;
      var temp = setInterval(function () {
        var now = new Date().getTime()
        var target = new Date(that.data.allEndTime).getTime()
        var dis = target - now
        var hour, min, sec
        let finalValue = null
        if (dis <= 0) {
          finalValue = {
            code: 1,
            data: "结束"
          }
          that.setData({
            timeShow: finalValue
          })
        }
        hour = parseInt(dis / 1000 / 60 / 60)
        min = parseInt((dis - hour * 60 * 60 * 1000) / 1000 / 60)
        sec = parseInt((dis - hour * 60 * 60 * 1000 - min * 1000 * 60) / 1000)
        finalValue = {
          code: 0,
          data: {
            hour: (hour + "").length == 1 ? "0" + hour : hour,
            min: (min + "").length == 1 ? "0" + min : min,
            sec: (sec + "").length == 1 ? "0" + sec : sec,
          }
        }
        that.setData({
          timeShow: finalValue
        })
        // 计算百分比
        var begin = new Date(that.data.allStartTime).getTime()
        that.setData({
          percentStart: (((now - begin) / (target - begin)).toFixed(3) * 100),
          percentEnd: ((1 - (now - begin) / (target - begin))).toFixed(3) * 100,
        })

      }, 1000)
    }

  })