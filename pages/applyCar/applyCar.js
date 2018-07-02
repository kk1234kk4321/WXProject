// pages/applyCar/applyCar.js
const app = getApp()

Page({

  //页面的初始数据
  data: {
    carNo: '',
    parkNo: '',
    price: 0
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '申请通行证',
    })

    this.setData({
      carNo: options.carNo,
      parkNo: options.parkNo,
      price: options.price
    })
  },

  //生命周期函数--监听页面显示
  onShow: function () {
  
  },

  //返回
  returnBtn: function() {
    var carNo = this.data.carNo;
    var parkNo = this.data.parkNo;
    var price = this.data.price;
    
    wx.navigateTo({
      url: '/pages/memberDeals/memberDeals?price=' + price + '&carNo=' + carNo + '&parkNo=' + parkNo + '&currCount=0&currPrice=0',
    })
  }
})