const app = getApp()

Page({
  //页面的初始数据
  data: {
    parkName: '',
    parkInfo: {}
  },

  //生命周期函数--监听页面加载
  onLoad: function (res) {
    this.setData({
      parkName: res.parkName
    })
    wx.setNavigationBarTitle({
      title: '停车场详情',
    })
  },

  //生命周期函数--监听页面显示
  onShow() {
    var that = this
    var parkName = that.data.parkName
    console.log("车位情况====>")

    wx.request({
      // url: app.globalData.url + '/park/parkInfo/parkName/' + encodeURI(parkName),
      url: app.globalData.url + '/car/weixin/parkInfo/parkName/' + encodeURI(parkName),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("parkInfo===>", res.data.data)
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