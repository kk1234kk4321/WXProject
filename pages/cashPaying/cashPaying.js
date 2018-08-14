const app = getApp()
Page({
  data: {
    feetsData: {},
    carNo: ''
  },
  onLoad(res) {
    this.setData({
      carNo: res.carNo
    }),
      wx.setNavigationBarTitle({
        title: '现金收讫'
      })
  },
  onShow() {
    var that = this
    var carno = that.data.carNo
    wx.request({
      url: app.globalData.url + '/car/weixin/record/carno/' + encodeURI(carno),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用应收金额接口成功")
        console.log("feetsData====>", res)
        if (res.data.data) {
          that.setData({
            feetsData: res.data.data
          })
        } else {
          that.setData({
            feetsData: ''
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var status = e.detail.value.status;
    var openId = app.globalData.openId;
    var fee = this.data.feetsData.finalFee;
    var originFee = this.data.feetsData.originFee;
    var parkNo = this.data.feetsData.parkNo;
    var carNo = this.data.feetsData.carNo;
    var recordId = this.data.feetsData.recordId;

    wx.request({
      url: app.globalData.url + '/car/weixin/cashPay/openid/' + openId + '/status/' + status + '/fee/' + fee + '/recordId/' + recordId + '/originFee/' + originFee + '/carNo/' + encodeURI(carNo) + '/parkNo/' + parkNo,
      method: 'GET',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('调用现金支付接口成功！')
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面   
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function () {
            wx.showToast({
              title: '支付失败',
              icon: 'fail',
              duration: 2000
            })
          },
          complete: function () {
            // complete   
          }
        })
      }
    })
  },
})
