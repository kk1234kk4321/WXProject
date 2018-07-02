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
        title: '白名单审核'
      })
  },
  onShow() {
    var that = this
    var parkNo = that.data.parkNo
    wx.request({
      url: app.globalData.url + '/park/applyCarList/parkNo/' + parkNo+'/openid/'+app.globalData.openId,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用审核白名单列表接口成功")
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
  goAudit:function(e){
    var that = this;
    console.log("进入白名单审核页面===", e.currentTarget.dataset);
    var data = e.currentTarget.dataset;
    var carNo = data.carNo;
    var id = data.id;
    var parkId = data.parkId;
    var status = data.status;
    wx.request({
      url: app.globalData.url + '/park/audit/parkId/' + parkId + '/applyCarId/' + id + '/status/' + status + '/carNo/' + encodeURI(carNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用白名单审核接口成功")
        console.log("array====>", res)
        wx.redirectTo({
          url: '/pages/auditInfo/auditInfo?parkNo=' + that.data.parkNo,
          success: function (res) {
            wx.showToast({
              title: '审核成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用白名单审核接口失败")
        console.log("失败原因====>", res)
        wx.showToast({
          title: '审核失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})