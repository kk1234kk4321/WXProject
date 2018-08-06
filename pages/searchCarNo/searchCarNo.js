// pages/sellerDiscount/sellerDiscount.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkNo: '',
    parkName: '',
    carNo: '',
    carList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      parkNo: res.parkNo,
      parkName: res.parkName
    });

    wx.setNavigationBarTitle({
      title: '搜索车牌号',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 监听文本框输入
   */
  carNoInput: function (e) {
    var carNo = e.detail.value;
    this.setData({
      carNo: carNo
    })
  },

  /**
   * 搜索车牌号
   */
  searchCarNo: function (e) {
    console.log('监听搜索框文本，carNo=', this.data.carNo);
    var that = this
    var parkNo = that.data.parkNo
    var carNo = that.data.carNo
    var openid = app.globalData.openId

    console.log("当前车牌：", carNo)
    console.log("parkNo：", parkNo)
    console.log("openid：", openid)
    if (carNo == '') {
      carNo = null
    }
    wx.request({
      url: app.globalData.url + '/car/weixin/carList/parkNo/' + encodeURI(parkNo) + '/carNo/' + encodeURI(carNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用车牌号列表接口成功")
        console.log("carList====>", res.data.data)
        if (res.data != '') {
          that.setData({
            carList: res.data.data
          })
        } else {
          that.setData({
            carList: ''
          })
        }
      }
    })
  },

  /**
   * 点击车牌->进入优惠券页面
   */
  sellerDiscount: function(e) {
    var that = this
    var parkNo = that.data.parkNo
    var parkName = that.data.parkName
    var carNo = e.currentTarget.dataset.carNo
    console.log("parkNo:", parkNo)
    console.log("carNo啦啦啦", carNo)

    wx.navigateTo({
      url: '/pages/sellerDiscount/sellerDiscount?parkNo=' + parkNo + '&parkName=' + parkName + '&carNo=' + carNo + '&currCount=0',
    })
  }
})