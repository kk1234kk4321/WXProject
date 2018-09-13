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
    var openid = app.globalData.openId
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

  /**
   * 搜索昵称
   */
  searchNickname: function (e) {
    console.log("监听文本框输入，nickname=", this.data.nickname)
    var that = this
    var parkNo = that.data.parkNo
    var nickname = that.data.nickname
    var openid = app.globalData.openId
    var type = 1 //1:微信注册

    console.log("昵称：", nickname)
    console.log("parkNo:", parkNo)
    console.log("openid", openid)
    that.onShow();
  },

  /**
   * 增加员工
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    var that = this
    var parkId = e.detail.target.dataset.parkId
    var parkNo = that.data.parkNo
    var nickname = e.detail.target.dataset.nickname
    var type = 1 //1:微信注册
    var data = e.detail.value
    var remainDiscount = data.remainDiscount
    var minutes = data.minutes
    console.log("parkId=", parkId)
    console.log("nickname=", nickname)
    console.log("剩余优惠券：", remainDiscount)
    console.log("抵扣时间：", minutes)
    if(remainDiscount == "" || remainDiscount == undefined || remainDiscount < 0 || remainDiscount == 0) {
      if(remainDiscount.length == 0) {
        wx.showToast({
          title: '剩余优惠券数量不可为空！',
          icon: 'none',
          duration: 2000
        })
      } else if(remainDiscount == 0) {
        wx.showToast({
          title: '剩余优惠券数量不可为0！',
          icon: 'none',
          duration: 2000
        })
      } else if(remainDiscount < 0) {
        wx.showToast({
          title: '剩余优惠券数量不可小于0！',
          icon: 'none',
          duration: 2000
        })
      }
      return;
    } 
    if(minutes == "" || minutes == undefined || minutes < 0 || minutes == 0) {
      if (minutes.length == 0) {
        wx.showToast({
          title: '抵扣时间不可为空！',
          icon: 'none',
          duration: 2000
        })
      } else if (minutes == 0) {
        wx.showToast({
          title: '抵扣时间不可为0！',
          icon: 'none',
          duration: 2000
        })
      } else if (minutes < 0) {
        wx.showToast({
          title: '抵扣时间不可小于0！',
          icon: 'none',
          duration: 2000
        })
      }
      return;
    }
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