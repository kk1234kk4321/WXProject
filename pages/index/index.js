//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //userInfo: {},
    //hasUserInfo: false,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    plateNums: {},
    authorty:0
    //openId:{}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  // onLoad: function () {
  onShow() {
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
          console.log("res.code ====>", res)
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
      url: app.globalData.url + '/car/weixin/openid/' + openid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log(res.data.data)
        that.getAuthorty(res.data.data.authorities);

        console.log("app.globalData.authorty==", app.globalData.authorty)
        that.setData({
          plateNums: res.data.data.list,
          authorty: app.globalData.authorty
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addPlateNo: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.redirectTo({
      url: '/pages/addPlateNo/addPlateNo'
    })
  },
  payFeets: function (e) {
    var plateNum = e.currentTarget.dataset.plateNum;
    console.log('当前车牌号为', plateNum);
    wx.redirectTo({
      url: '/pages/payFeets/payFeets?plateNum=' + plateNum
    })
  },
  searchPark: function (e) {//车位预约
    var plateNum = "carNo";
    console.log("欢迎来停车场搜索页面");
    //console.log(e);
    wx.redirectTo({
      url: '/pages/searchPark/searchPark?plateNum=' + plateNum
    })
  },
  //长期租位
  rentParkingplace: function (e) {
    console.log("进入长期租位页面");
    wx.redirectTo({
      url: '/pages/rentParkingplace/rentParkingplace',
    })
  },
  getAuthorty(array) {
    if(array!=null&&array.length>0){
      for (var i = 0; i < array.length; i++) {
        console.log("array[i].authorty==", array[i].authorty);
        if (array[i].authorty == "ROLE_PARK_ADMIN") {
          app.globalData.authorty = 1;
          break;
        } else if (array[i].authorty == "ROLE_PARK_STAFF"){
          app.globalData.authorty = 2;
        }else{
          app.globalData.authorty = 0;
        }
      }
    }
  },
  parkManage:function(e){
    wx.redirectTo({
      url: '/pages/parkManage/parkManage'
    })
  },
  myinfo:function(){
    wx.redirectTo({
      url: '/pages/myInfo/myInfo'
    })
  }
})
