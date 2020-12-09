var util = require("../../utils/util.js")

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
    videoList: [{
      id: 0,
      type: 'video',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/00.mp4?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/01.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608',
    }, {
      id: 1,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/02.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }, {
      id: 2,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/03.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }, {
      id: 3,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/04.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }, {
      id: 4,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/05.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }, {
      id: 5,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/06.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }, {
      id: 6,
      type: 'image',
      url: 'https://776a-wjp1842133-1256216380.tcb.qcloud.la/beautif/07.png?sign=f1a6419a9458ecfc2d8822fb9668a3ad&t=1607325608'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var start = util.formatTime(new Date()).substring(0, 11) + that.data.timeStart;
    that.setData({
      allStartTime: start
    })

    var end = util.formatTime(new Date()).substring(0, 11) + that.data.timeEnd;
    that.setData({
      allEndTime: end
    })

    // 从云开发中获取图片

    // 如果当前时间是下午六点之前 则以六点为结束时间  如果超过了下午六点 则以当前时间加一小时为结束时间（防止出现负的时间）
    // 结束时间永远大于开始时间     开始时间和结束时间设置完了点修改按钮才生效否则使用默认值      把地方用起来   调节视频和照片的大小
    let curData = util.formatTime(new Date()).substring(0, 11)
    // console.log(curData)
    let curHour = parseInt(util.formatTime(new Date()).substring(11, 13))
    // let curHour = 20
    let startHour = parseInt(that.data.timeStart.substring(0, 2))
    let endHour = parseInt(that.data.timeEnd.substring(0, 2))
    console.log(curHour, startHour, endHour)
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
        percentStart: (((now - begin) / (target - begin))).toFixed(3) * 100,
        percentEnd: ((1 - (now - begin) / (target - begin))).toFixed(3) * 100,
      })
     
    }, 1000)
  }

})