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
  unitMinuteInput: function (e) {
    var unitMinute = e.detail.value;
    if (unitMinute.length == 0) {
      wx.showToast({
        title: '单位时间不可为空！',
        icon: 'none',
        duration: 2000
      })
    } else if (unitMinute == 0) {
      wx.showToast({
        title: '单位时间不可为0！',
        icon: 'none',
        duration: 2000
      })

    } else if (unitMinute < 0) {
      wx.showToast({
        title: '单位时间不可小于0！',
        icon: 'none',
        duration: 2000
      })

    }
    this.setData({
      focus: true
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)

    var data = e.detail.value;
    var id = e.detail.target.dataset.parkId;
    var startMinute = data.startMinute;
    if (startMinute == '') {
      startMinute = 0;
    }
    var startPrice = data.startPrice;
    if (startPrice == '') {
      startPrice = 0;
    }
    var feeTop = data.feeTop;
    if (feeTop == '') {
      feeTop = 0;
    }
    var freeMinute = data.freeMinute;
    if (freeMinute == '') {
      freeMinute = 0;
    }
    var feeMonth = data.feeMonth;
    if (feeMonth == '') {
      feeMonth = 0;
    }
    var unitPrice = data.unitPrice;
    if (unitPrice == '') {
      unitPrice = 0;
    }

    var unitMinute = data.unitMinute;
    if (unitMinute == "" || unitMinute == undefined || unitMinute < 0 || unitMinute == 0) {
      if (unitMinute.length == 0) {
        wx.showToast({
          title: '单位时间不可为空！',
          icon: 'none',
          duration: 2000
        })
      } else if (unitMinute == 0) {
        wx.showToast({
          title: '单位时间不可为0！',
          icon: 'none',
          duration: 2000
        })

      } else if (unitMinute < 0) {
        wx.showToast({
          title: '单位时间不可小于0！',
          icon: 'none',
          duration: 2000
        })

      }
      this.setData({
        focus: true
      })
    } else {
      unitMinute = unitMinute;
      wx.request({
        url: app.globalData.url + '/park/updatePark/id/' + id + '/startMinute/' + startMinute + '/startPrice/' + startPrice + '/feeTop/' + feeTop + '/freeMinute/' + freeMinute + '/feeMonth/' + feeMonth + '/unitMinute/' + unitMinute + '/unitPrice/' + unitPrice,
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("调用修改计费规则接口成功")
          console.log("array====>", res)
          wx.redirectTo({
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
    }

  },
})