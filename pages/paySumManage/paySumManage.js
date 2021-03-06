const app = getApp()
Page({
  data: {
    array1: {},
    array2: {},
    parkNo: ''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo
    }),
      wx.setNavigationBarTitle({
        title: '收益统计'
      })
  },
  onShow() {
    var that = this
    var parkNo = that.data.parkNo
    wx.request({
      url: app.globalData.url + '/park/payFeeSum/parkNo/' + parkNo,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用缴费汇总接口成功")
        var data = res.data.data
        console.log("array====>", data)
        if (data.parkPay) {
          that.setData({
            array1: res.data.data.parkPay
          })
        }
        if (data.membersPay){
          that.setData({
            array2: res.data.data.membersPay
          })
        }
      }
    })
  },
  detailForPark(e){
    console.log("准备进入在线收费明细页面===", e.currentTarget.dataset.outTime);
    wx.navigateTo({
      url: '/pages/payFeeDetail/payFeeDetail?parkNo=' + this.data.parkNo + '&outTime=' + e.currentTarget.dataset.outTime
    })
  },
  detailForMember(e){
    console.log("准备进入长期租位收费明细页面===", e.currentTarget.dataset.payTime);
    wx.navigateTo({
      url: '/pages/payFeeDetailForMember/payFeeDetailForMember?parkNo=' + this.data.parkNo + '&payTime=' + e.currentTarget.dataset.payTime
    })
  }
})