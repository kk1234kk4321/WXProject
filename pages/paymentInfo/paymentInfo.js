const app = getApp()

Page({
  data: {
    paymentInfo: {},
    plateNum: null
  },
  onLoad(res) {
    console.log('车牌号为：', res.plateNum)
    this.setData({
      plateNum: res.plateNum
    })
    var that = this;
    console.log("url====>", app.globalData.url + '/car/weixin/recordHis/carno/' + encodeURI(res.plateNum))
    wx.request({
      url: app.globalData.url + '/car/weixin/recordHis/carno/' + encodeURI(res.plateNum),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log("在线缴费记录====>", res)
        if(res.data.data){
          that.setData({
            paymentInfo: res.data.data
          })
        }else{
          that.setData({
            paymentInfo: ''
          })
        }
      }
    })
      wx.setNavigationBarTitle({
        title: '历史记录'
      })
  }
})