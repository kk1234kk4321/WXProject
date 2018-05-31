//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    plateNums: {},
    //openId:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '您的车牌号'
    })
    console.log("openid====>", app.globalData.openId)
    var that = this
    if (app.globalData.openId) {
      console.log("if====", app.globalData.openId)
      that.getPlateNums(app.globalData.openId)
    } else {
      console.log("else====", app.globalData.openId)
        wx.login({
        success: res => {
          console.log("res.code ====>", res.code )
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var that = this;
          if(res.code){
            wx.request({
              url: app.globalData.url + '/car/weixin/jscode/' + res.code,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log('index页面load数据')
                console.log(res)
                app.globalData.openId = res.data
                that.getPlateNums(res.data)
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
  getPlateNums(openid) {
    var that = this;
    wx.request({
      url: app.globalData.url+'/car/weixin/openid/' + openid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log(res.data.data)
        that.setData({
          plateNums: res.data.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addPlateNo:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.navigateTo({
      url: '/pages/addPlateNo/addPlateNo'
    })
  },
  payFeets:function(e){
    var plateNum = e.currentTarget.dataset.plateNum;
    console.log('当前车牌号为', plateNum);
    wx.navigateTo({
      url: '/pages/payFeets/payFeets?plateNum='+plateNum
    })
  },
  searchPark:function(e){
    console.log("欢迎来停车场搜索页面");
    //console.log(e);
    wx.navigateTo({
      url: '/pages/searchPark/searchPark'
    })
  }
})
