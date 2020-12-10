var util = require("../../utils/util.js")
// wx.cloud.init({
//   env: 'wjp1842133',
//   traceUser: true,
// })
wx.cloud.init()
var db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeStart: '09:00',
    allStartTime: '',
    timeEnd: '18:00',
    allEndTime: '',
    region: ['宁夏回族自治区', '银川市', '西夏区'],
    timeShow: null,
    percentStart: 70,
    percentEnd: 30,
    videoList: [],
    swiperList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getCloudData()

    var start = util.formatTime(new Date()).substring(0, 11) + that.data.timeStart;
    that.setData({
      allStartTime: start
    })

    var end = util.formatTime(new Date()).substring(0, 11) + that.data.timeEnd;
    that.setData({
      allEndTime: end
    })

    let curData = util.formatTime(new Date()).substring(0, 11)
    let curHour = parseInt(util.formatTime(new Date()).substring(11, 13))
    let startHour = parseInt(that.data.timeStart.substring(0, 2))
    let endHour = parseInt(that.data.timeEnd.substring(0, 2))
    if (0 <= curHour && curHour < startHour) {
      that.setData({
        allStartTime: curData + '00:00',
        timeStart: '0:00'
      })
    }

    if (endHour < curHour && curHour <= 23) {
      if (curHour + 1 > 23) {
        that.setData({
          allEndTime: curData + '23:59',
          timeEnd: '23:59'
        })
      } else {
        that.setData({
          allEndTime: curData + (curHour + 1).toString() + ':00',
          timeEnd: (curHour + 1).toString() + ':00'
        })
      }
    }

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
  // ConfigFixedTime: function () {
  //   var that = this
  //   that.BeginTimeDown()
  // },
  // 取消修改
  // CancelFixedTime: function () {

  // },

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
  // RegionChange: function (e) {
  //   var that = this
  //   console.log("---------地址：", e)
  //   that.setData({
  //     region: e.detail.value
  //   })
  // },
  // 开始倒计时
  BeginTimeDown: function () {
    var that = this;
    var temp = setInterval(function () {
      var now = new Date().getTime()
      var target = new Date(that.data.allEndTime).getTime()
      var dis = target - now
      var hour, min, sec
      hour = parseInt(dis / 1000 / 60 / 60)
      min = parseInt((dis - hour * 60 * 60 * 1000) / 1000 / 60)
      sec = parseInt((dis - hour * 60 * 60 * 1000 - min * 1000 * 60) / 1000)

      let finalValue = null
      if (dis <= 0) {
        finalValue = {
          code: 1,
          data: "结束"
        }
        that.setData({
          timeShow: finalValue
        })
      } else {
        finalValue = {
          code: 0,
          data: {
            hour: (hour + "").length == 1 ? "0" + hour : hour,
            min: (min + "").length == 1 ? "0" + min : min,
            sec: (sec + "").length == 1 ? "0" + sec : sec,
          }
        }
      }
      that.setData({
        timeShow: finalValue
      })
      // 计算百分比
      var begin = new Date(that.data.allStartTime).getTime()
      let startTemp = (((now - begin) / (target - begin)) * 100).toString().substring(0, 4)
      let endTemp = ((1 - (now - begin) / (target - begin)) * 100).toString().substring(0, 4)
      that.setData({
        percentStart: parseFloat(startTemp),
        percentEnd: parseFloat(endTemp),
      })

    }, 1000)
  },
  getCloudData: function () {
    var that = this
    // 访问云开发中的数据库得到图片连接
    db.collection('image').get({
      success: function (res) {
        that.setData({
          swiperList: res.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
     // 访问云开发中的数据库得到视频连接
     db.collection('video').get({
      success: function (res) {
        that.setData({
          videoList: res.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

})