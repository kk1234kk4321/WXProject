const app = getApp()

Page({

  //页面的初始数据
  data: {
    parkName: ''
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '停车场搜索'
    })
  },
  
  //监听文本框输入
  parkNameInput: function(e) {
    var parkName = e.detail.value;
    this.setData({
      parkName: parkName
    })
  },
  
  //停车场搜索功能
  searchPark:function(e) {
    var parkName = e.currentTarget.dataset.plateNum;
    console.log('您输入的停车场：', parkName);
    wx.navigateTo({
      url: '/pages/parkRecord/parkRecord?parkName='+parkName
    }) 
  }
})