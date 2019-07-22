// pages/login/login.js

import getData from '../../common/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    code: '',
    codeNumber: '',
    countDown: false,
    time: 60,

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    isAgree: false
  },
  /**
   * 保存输入的手机号码
   */
  bindPhoneInput: function (event) {
    this.setData({
      phoneNumber: event.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  /**
   * 保存输入的验证码
   */
  bindCodeInput: function (event) {
    this.setData({
      code: event.detail.value
    })
  },
  /**
   * 根据手机号码获取验证码
   */
  getVerificationCode: function () {
    const { phoneNumber, isAgree } = this.data;
    console.log(phoneNumber, isAgree);
    // 根据手机号码请求接口，校验手机号是否在系统中，校验成功发送验证码，否则无权继续访问
    this.setData({
      codeNumber: '1234',
      countDown: true
    }, () => {
      this.timer = setInterval(() => {
        let { time } = this.data;
        if (time - 1 < 0) {
          clearInterval(this.timer);
          this.setData({ 
            countDown: false,
            time: 60 
          });
          return;
        }
        this.setData({time: time - 1})
      }, 1000)
    })
  }, 
  /**
   * 勾选同意协议按钮
   */

  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  checkboxChange: function (event) {
    const value = event.detail.value[0];
    this.setData({
      agree: Boolean(value)
    })
  },

  /**
   * 确认授权
   */
  confirmAuthorization: function () {
    const { phoneNumber, codeNumber, code, isAgree } = this.data;
    console.log(phoneNumber, codeNumber, code, isAgree)
    // 校验是否输入了验证码
    if (!code) {
      wx.showToast({
        title: '请输入手机验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    // 校验验证码是否正确
    if (code !== codeNumber) {
      wx.showToast({
        title: '输入的验证码有误请重新输入',
        icon: 'none',
        duration: 2000
      })
      this.setData({ code: '' })
      return;
    }
    // 检查是否同意协议
    if (!isAgree) {
      wx.showToast({
        title: '请阅读协议并同意授权',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.navigateTo({
      url: '../kids/kids?id=1'
    })
    return;
    // TODO 授权操作
    // 确认授权，想后台发送授权请求
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})