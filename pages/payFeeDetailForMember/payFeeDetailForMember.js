// pages/payFeeDetail/payFeeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: {},
    parkNo: '',
    payTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      parkNo: res.parkNo,
      payTime: res.payTime
    }),
      wx.setNavigationBarTitle({
        title: '长期租位收费明细'
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var parkNo = that.data.parkNo
    var payTime = that.data.payTime
    wx.request({
      url: app.globalData.url + '/park/payFeeDetailForMember/payTime/' + payTime + '/parkNo/' + parkNo,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用长期租位缴费明细接口成功")
        var data = res.data.data
        console.log("array====>", data)
        if (data) {
          that.setData({
            array: data
          })
        }
      }
    })
  },

})