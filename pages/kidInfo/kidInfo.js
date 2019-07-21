// pages/kidInfo/kidInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices: [
      { id: 1, content: '2019年8月1日全体小朋友歌唱比赛' },
      { id: 2, content: '2019年8月28日小（1）班放假一天' },
      { id: 3, content: '2019年8月31全体小朋友带棒棒糖一枝' },
      { id: 4, content: '2019年8月15日午餐自助餐' },
    ],
    showNotice: [],
    currentDate: "",
    dayList: '',
    currentDayList: '',
    currentObj: '',
    currentDay: '',
    currentClickKey: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { notices } = this.data;
    if (notices && notices.length) {
      this.setData({
        showNotice: notices[0]
      }, this.loopNotice);
    }

    var currentObj = this.getCurrentDayString()
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentDay: currentObj.getDate(),
      currentObj: currentObj
    })
    this.setSchedule(currentObj)
  },
  loopNotice: function () {
    const { notices } = this.data;
    let len = notices.length;
    let currentIndex = 0;
    this.timer = setInterval(() => {
      currentIndex += 1;
      if (currentIndex === len) {
        currentIndex = 0;
      } 
      this.setData({
        showNotice: notices[currentIndex]
      })
    }, 2000)
  },
  doDay: function (e) {
    var that = this
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this
    var m = currentObj.getMonth() + 1
    var Y = currentObj.getFullYear()
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate()
    var currentDayNum = new Date(Y, m, 0).getDate()
    var currentDayWeek = currentObj.getUTCDay() + 1
    var result = currentDayWeek - (d % 7 - 1);
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = []
    var f = 0
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = f + 1
          f = currentDayList[i]
        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }
      }
    }
    that.setData({
      currentDayList: currentDayList
    })
  },

  // 设置点击事件
  onClickItem: function (e) {

    console.log(JSON.stringify((e)));
    console.log('1111111111111111111111');

    console.log(JSON.stringify((e.currentTarget)));
    this.setData({
      currentClickKey: e.currentTarget.id
    });
  }

})