// pages/rentParkingplace/rentParkingplace.js
const app = getApp()

Page({

  //页面的初始数据
  data: {
    plateNums: {},
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择车牌',
    }),

    console.log("openid===>", app.globalData.openId);
    var that = this;
    if(app.globalData.openId) {
      console.log("if====", app.globalData.openId);
      that.getPlateNums(app.globalData.openId);
    } else {
      console.log("else====", app.globalData.openId);
      wx.login({
        success: res => {
          console.log("res.code====>", res.code);
          //发送res.code到后台获取openId
          var that = this;
          if(res.code) {
            wx.request({
              url: app.globalData.url + '/car/weixin/jscode/' + res.code,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log("rentParkingplace页面加载数据");
                console.log(res);
                app.globalData.openId = res.data;
                that.getPlateNums(res.data);
              },
              fail: function (res) {
                console.log("获取openId失败", res);
              }
            })
          } else {
            console.log("登录失败！", res.errMsg);
          }
        } 
      })  
    }
  },

  //获取车牌
  getPlateNums(openid) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/car/weixin/openid/' + openid,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用接口成功");
        console.log(res.data.data);
        
        that.setData({
          plateNums: res.data.data.list
        })
      }
    })
  },

  //生命周期函数--监听页面显示
  onShow: function () {

  },

  //选择park
  selectPark: function(e) {
    var plateNum = e.currentTarget.dataset.plateNum;
    console.log("当前车牌号为", plateNum);
    wx.navigateTo({
      url: '/pages/searchPark/searchPark?plateNum=' + plateNum
    })
  }
})