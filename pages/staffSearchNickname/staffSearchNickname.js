// pages/staffSearchNickname/staffSearchNickname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    parkNo: '',
    staff: {}
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
      url: app.globalData.url + '/car/weixin/staffSearchNickname/nickname/' + encodeURI(nickname) + '/parkNo/' + encodeURI(parkNo) + '/type/' + type,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用搜索昵称接口成功")
        console.log("staff====>", res.data.data)
        if(res.data != {}) {
          that.setData({
            staff: res.data.data
          })
        }
      }
    })
  },

  /**
   * 监听文本框输入
   */
  nicknameInput: function(e) {
    var nickname = e.detail.value
    this.setData({
      nickname: nickname
    })
  },

  /**
   * 搜索昵称
   */
  searchNickname: function(e) {
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
  addStaff: function(e) {
    var that = this
    var parkId = e.currentTarget.dataset.parkId
    var parkNo = that.data.parkNo
    var nickname = e.currentTarget.dataset.nickname
    var type = 1 //1:微信注册
    console.log("parkId=", parkId)
    console.log("nickname=", nickname)

    wx.request({
      url: app.globalData.url + '/car/weixin/addStaff/nickname/' + encodeURI(nickname) + '/parkId/' + encodeURI(parkId) + '/type/' + type,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用增加员工接口成功")
        console.log("message===", res.data.data)
        if(res.data != '') {
          that.setData({
            staff: res.data.data
          })
        } else {
          that.setData({
            staff: ''
          })
        }

        if(that.data.staff.message == '') {
          wx.redirectTo({
            url: '/pages/staffManage/staffManage?parkNo=' + parkNo,
          })
        }
      }
    })
  },

  /**
   * 返回
   */
  returnBtn: function (e) {
    var parkNo = this.data.parkNo
    wx.redirectTo({
      url: '/pages/staffManage/staffManage?parkNo=' + parkNo,
    })
  }

})