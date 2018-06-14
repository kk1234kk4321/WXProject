const app = getApp()
Page({
  data: {
    array: {},
    parkNo: '',
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo
    }),
      wx.setNavigationBarTitle({
        title: '在停车辆管理'
      })
  },
  onShow() {
    var that = this
    var parkNo = that.data.parkNo
    wx.request({
      url: app.globalData.url + '/park/parking/parkNo/' + parkNo,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用在停车辆列表接口成功")
        console.log("array====>", res)
        if (res.data != '') {
          that.setData({
            array: res.data.data
          })
        } else {
          that.setData({
            array: ''
          })
        }
      }
    })
  },
})