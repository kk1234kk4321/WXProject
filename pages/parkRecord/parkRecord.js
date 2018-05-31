const app = getApp()
// pages/parkInfo/parkInfo.js
Page({

  //页面的初始数据
  data: {
    parkName: '',
    parkInfo: {}
  },

  //生命周期函数--监听页面加载
  onLoad: function (res) {
    console.log("停车场信息为：", res.parkName);
    this.setData({
      parkName:res.parkName
    })
    wx.setNavigationBarTitle({
      title: '停车场列表',
    })
  },

  //生命周期函数--监听页面显示
  onShow() {
    var that = this
    var parkName = that.data.parkName
    console.log("--- 正在搜索"+parkName+" ---")

    wx.request({
      url: app.globalData.url + '/park/parkInfo/parkName/' + encodeURI(parkName),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用search接口成功")
        console.log("parkInfo====>", res)
        console.log(res.data.data)
        if (res.data != '') {
          that.setData({
            parkInfo: res.data.data
          })
        } else {
          that.setData({
            parkInfo: ''
          })
        }
      }
    })
  }
})