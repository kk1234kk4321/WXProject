// pages/staffSearchNickname/staffSearchNickname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    parkNo: '',
    seller: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      nickname: res.nickname,
      parkNo: res.parkNo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var nickname = that.data.nickname
    var parkNo = that.data.parkNo
    var openid = app.globalData.openid
    var type = 1 //1:微信注册

    console.log("nickname=", nickname)
    console.log("parkNo=", parkNo)
    console.log("openid", openid)
    if (nickname == '') {
      nickname = 'null'
    }
    wx.request({
      url: app.globalData.url + '/car/weixin/sellerSearchNickname/nickname/' + encodeURI(nickname) + '/parkNo/' + encodeURI(parkNo) + '/type/' + type,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用搜索昵称接口成功")
        console.log("seller====>", res.data.data)
        if (res.data != {}) {
          that.setData({
            seller: res.data.data
          })
        }
      }
    })
  },

  /**
   * 监听文本框输入
   */
  nicknameInput: function (e) {
    var nickname = e.detail.value
    this.setData({
      nickname: nickname
    })
  },
  remainDiscountInput: function(e) {
    var remainDiscount = e.detail.value
    this.setData({
      remainDiscount: remainDiscount
    })
  },
  minutesInput: function(e) {
    var minutes = e.detail.value
    this.setData({
      minutes: minutes
    })
  },

  /**
   * 搜索昵称
   */
  searchNickname: function (e) {
    console.log("监听文本框输入，nickname=", this.data.nickname)
    var that = this
    var parkNo = that.data.parkNo
    var nickname = that.data.nickname
    var openid = app.globalData.openid
    var type = 1 //1:微信注册

    console.log("昵称：", nickname)
    console.log("parkNo:", parkNo)
    console.log("openid", openid)
    that.onShow();
  },

  /**
   * 增加员工
   */
  addSeller: function (e) {
    var that = this
    var parkId = e.currentTarget.dataset.parkId
    var parkNo = that.data.parkNo
    var nickname = e.currentTarget.dataset.nickname
    var type = 1 //1:微信注册
    var remainDiscount = that.data.remainDiscount
    var minutes = that.data.minutes
    if (remainDiscount == undefined) {
      console.log("哈哈哈")
      var remainDiscount = e.currentTarget.dataset.remainDiscount
    }
    if (minutes == undefined) {
      var minutes = e.currentTarget.dataset.minutes
    }
    console.log("parkId=", parkId)
    console.log("nickname=", nickname)
    console.log("剩余优惠券：", remainDiscount)
    console.log("抵扣时间：", minutes)

    wx.request({
      url: app.globalData.url + '/car/weixin/addSeller/nickname/' + encodeURI(nickname) + '/parkId/' + parkId + '/type/' + type + '/remainDiscount/' + remainDiscount + '/minutes/' + minutes,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用增加员工接口成功")
        console.log("message===", res.data.data)
        if (res.data != '') {
          that.setData({
            seller: res.data.data
          })
        } else {
          that.setData({
            seller: ''
          })
        }

        if (that.data.seller.message == '') {
          wx.redirectTo({
            url: '/pages/sellerSetManage/sellerSetManage?parkNo=' + parkNo,
          })
        }
      }
    })
  }
})