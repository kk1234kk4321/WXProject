//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        if(res.code){
          console.log("that.globalData.url===>", that.globalData.url)
          wx.request({
            url: that.globalData.url + '/car/weixin/jscode/' + res.code,
            data: {},
            method: 'GET',
            success: function (res) {
              console.log('返回openId')
              console.log(res.data)
              that.globalData.openId = res.data
              //that.getPlateNums(res.data.openid)            
            },
            fail: function (res){
              console.log("获取OPENID失败，",res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    plateNums:null,
    openId:null,
    authorty: 0,
    // url:'http://localhost'
    url:'http://192.168.1.126'
    // url:'http://192.168.1.113'
    //url:'http://localhost:8080'
    //  url:'http://192.168.1.113:8080'
    // url:'https://park.zhangyuanzhineng.com'
  },
  getPlateNums(openid){
    var that = this;
    wx.request({
      url: 'http://' + app.globalData.url +'/carno/weixin/openid/' + openid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log(res.data.data)
        that.globalData.plateNums = res.data.data.list;
        getAuthorty(res.data.data.authorities);
      }
    })
  },
  getAuthorty(array){
    var that = this;
    if(array!=null&&array.length>0){
      for(var i=0;i<array.length;i++){
        console.log("array[i].authorty==", array[i].authorty);
        if (array[i].authorty == "ROLE_PARK_ADMIN") {
          app.globalData.authorty = 1;
          break;
        } else if (array[i].authorty == "ROLE_PARK_STAFF") {
          app.globalData.authorty = 2;
        } else {
          app.globalData.authorty = 0;
        }
      }
    }
  }
})