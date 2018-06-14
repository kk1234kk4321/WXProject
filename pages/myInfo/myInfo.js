// pages/myInfo/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.openId,
    nickname: '',
    mes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的主页',
    })

    var that = this;
    if (app.globalData.openId) {
      console.log("if====", app.globalData.openId)
      that.getMyInfo(app.globalData.openId)
    } else {
      console.log("else====", app.globalData.openId)
      wx.login({
        success: res => {
          console.log("res.code ====>", res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var that = this;
          if (res.code) {
            console.log("url====>", app.globalData.url + '/car/weixin/jscode/' + res.code)
            wx.request({
              url: app.globalData.url + '/car/weixin/jscode/' + res.code,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log('index页面load数据')
                console.log(res)
                app.globalData.openId = res.data
                that.getMyInfo(res.data)
              },
              fail: function (res) {
                console.log("获取OPENID失败，", res)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  getMyInfo(openid) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/car/weixin/openid/' + openid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("正在获取个人信息，哈哈哈...")
        console.log(res.data.data)
        that.setData({
          nickname: res.data.data.nickname
        })
      }
    })
  },

  /**
   * 监听文本框输入
   */
  nicknameInput: function(e) {
    var nickname = e.detail.value;
    this.setData({
      nickname: nickname
    })
  },

  /**
   * 修改用户昵称
   */
  updateNickname: function(e) {
    console.log("修改用户昵称啦...");
    var that = this;
    var openId = app.globalData.openId;
    var nickname = that.data.nickname;
    console.log("昵称：", nickname);
    
    if(nickname != "" && nickname != null) {
      wx.request({
        url: app.globalData.url + '/car/weixin/openId/' + encodeURI(openId) + '/nickname/' + encodeURI(nickname),
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("啦啦啦!!!");
          console.log("mes：", res.data.data);
          that.setData({
            mes: res.data.data.mes
          })
        }
      })
    } else {
      console.log("请设置您的昵称！");
      that.setData({
        mes: '请设置您的昵称！'
      })
    }
  }
})