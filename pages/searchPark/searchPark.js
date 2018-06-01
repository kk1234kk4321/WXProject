const app = getApp()

Page({

  //页面的初始数据
  data: {
    parkName: '',
    parkList: {}
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
    var that = this
    var parkName = that.data.parkName
    if(parkName=="") {
      that.setData({
        parkList: ''
      })
    }
    console.log("--- 正在搜索" + parkName + " ---")

    wx.request({
      url: app.globalData.url + '/park/parkList/parkName/' + encodeURI(parkName),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用search接口成功")
        console.log("parkInfo====>", res)
        console.log(res.data.data)
        if (res.data != '') {
          that.setData({
            parkList: res.data.data
          })
        } else {
          that.setData({
            parkList: ''
          })
        }
      }
    })
  },

  //停车场详情
  parkDetails: function (e) {
    var parkName = e.currentTarget.dataset.plateNum;
    console.log(parkName);
    wx.navigateTo({
      url: '/pages/parkInfo/parkInfo?parkName=' + parkName,
    })
  }
})