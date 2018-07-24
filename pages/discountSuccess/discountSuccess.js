// pages/discountSuccess/discountSuccess.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkNo: '',
    carNo: '',
    record: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      parkNo: res.parkNo,
      carNo: res.carNo
    })

    wx.setNavigationBarTitle({
      title: '优惠成功',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var parkNo = that.data.parkNo
    var carNo = that.data.carNo

    console.log("停车场：", parkNo)
    console.log("车牌号：", carNo)
    wx.request({
      url: app.globalData.url + '/car/weixin/record/parkNo/' + encodeURI(parkNo) + '/carNo/' + encodeURI(carNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("查询优惠成功后的抵扣时间")
        that.setData({
          record: res.data.data
        })
      }
    })
  },

  /**
   * 返回
   */
  returnBtn: function(e) {
    var parkNo = this.data.parkNo
    var carNo = this.data.carNo
    wx.redirectTo({
      url: '/pages/sellerDiscount/sellerDiscount?parkNo=' + parkNo + '&carNo=' + carNo + '&currCount=0',
    })
  }
})