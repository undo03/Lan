// pages/parent/parent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '男',
    credentialType: '身份证',
    relationship: '',
    IDNumber: '',
    family: '',
    phoneNumber: '',
    occupation: ''
  },

  chooseSex: function () {
    let sexList = ['男', '女'];
    wx.showActionSheet({
      itemList: sexList,
      success: (res) => {
        const { tapIndex } = res;
        this.setData({
          sex: sexList[tapIndex]
        })
      }
    })
  },
 
  chooseCredentialType: function () {
    let credentialList = ['身份证', '军官证', '驾驶证'];
    wx.showActionSheet({
      itemList: credentialList,
      success: (res) => {
        const { tapIndex } = res;
        this.setData({
          credentialType: credentialList[tapIndex]
        })
      }
    })
  },
  inputRelationship: function (event) {
    this.setData({
      relationship: event.detail.value
    })
  },
  inputIDNumber: function (event) {
    this.setData({
      IDNumber: event.detail.value
    })
  },
  inputFamily: function (event) {
    this.setData({
      family: event.detail.value
    })
  },
  inputPhoneNumber: function (event) {
    this.setData({
      phoneNumber: event.detail.value
    })
  },
  inputOccupation: function (event) {
    this.setData({
      occupation: event.detail.value
    })
  },
})