const app = getApp()
Page({
  data: {
    array: {},
    parkNo: ''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo
    }),
    wx.setNavigationBarTitle({
      title: '修改计费规则'
    })
  },
  onShow() {
    var that = this
    var parkNo = that.data.parkNo
    var openId = app.globalData.openId
    wx.request({
      url: app.globalData.url + '/park/parkOwnerInfo/parkNo/' + parkNo,
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    var data = e.detail.value;
    var id = e.detail.target.dataset.parkId;
    var feeHour = data.feeHour;
    if(feeHour==''){
      feeHour = 0;
    }
    var feeTop = data.feeTop;
    if(feeTop==''){
      feeTop = 0;
    }
    var freeHour = data.freeHour;
    if(freeHour==''){
      freeHour = 0;
    }
    var feeMonth = data.feeMonth;
    if(feeMonth==''){
      feeMonth = 0;
    }
    wx.request({
      url: app.globalData.url + '/park/updatePark/id/' + id + '/feeHour/' + feeHour + '/feeTop/' + feeTop + '/freeHour/' + freeHour + '/feeMonth/' + feeMonth,
      method: 'GET',
      data: {
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用修改计费规则接口成功")
        console.log("array====>", res)
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/index/index',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log("调用修改计费规则接口失败")
        console.log("失败原因====>", res)
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
})