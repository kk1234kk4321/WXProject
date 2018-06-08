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
      title: '停车场管理'
    })
  },
  onShow() {
    var that = this
    var openId = app.globalData.openId
    wx.request({
      url: app.globalData.url + '/park/parkOwnerList/openid/' + openId,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用车场管理接口成功")
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
  parkManage:function(e){
    console.log("准备进入停车场业务功能管理页面===", e.target.dataset);
    wx.navigateTo({
      url: '/pages/parkOwnerManage/parkOwnerManage?parkNo='+e.target.dataset.parkNo
    })
  }
})