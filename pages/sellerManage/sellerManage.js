const app = getApp()
Page({
  data: {
    array: {},
  },
  onLoad(res) {
    /*this.setData({
      parkNo: res.parkNo
    }),*/
    wx.setNavigationBarTitle({
      title: '商家管理'
    })
  },
  onShow() {
    var that = this
    var openId = app.globalData.openId
    console.log("商家进入停车场管理页面", app.globalData.url + '/car/weixin/seller/parkList/openid/' + openId)

    wx.request({
      url: app.globalData.url + '/car/weixin/seller/parkList/openid/' + encodeURI(openId),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用商家停车场管理接口成功")
        console.log("parkList====>", res)
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
  sellerDiscount: function (e) {
    var plateNum = 'carNo';
    console.log("准备进入商家管理页面===", e.target.dataset);
    wx.navigateTo({
      url: '/pages/sellerDiscount/sellerDiscount?parkNo=' + e.target.dataset.parkNo + '&carNo=0&currCount=0&plateNum=' + plateNum
    })
  }
})