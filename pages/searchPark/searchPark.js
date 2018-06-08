const app = getApp()

Page({

  //页面的初始数据
  data: {
    parkName: '',
    parkList: {},
    plateNum: ''
  },

  //生命周期函数--监听页面加载
  onLoad: function (res) {
    if(res.plateNum=="carNo") {//车位预约
      console.log("您要预约的车牌号：", res.plateNum);
    } else {//长期租位
      console.log("您要长期租位的车牌号：", res.plateNum);
    }
    this.setData({
      plateNum: res.plateNum
    })

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
    var plateNum = that.data.plateNum
    console.log("车牌为", plateNum)
    if(parkName==""||parkName==null) {//搜索内容为空
      that.setData({
        parkList: ''
      })
    } else {//搜索内容不为空
      console.log("--- 正在搜索" + parkName + " ---")

      wx.request({
        // url: app.globalData.url + '/park/parkList/parkName/' + encodeURI(parkName) + '/carNo/' + encodeURI(plateNum),
        url: app.globalData.url + '/car/weixin/parkList/parkName/' + encodeURI(parkName) + '/carNo/' + encodeURI(plateNum),
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
    }
  },

  //停车场详情
  parkInfo: function (e) {
    var parkName = e.currentTarget.dataset.parkName;
    console.log(parkName);
    wx.navigateTo({
      url: '/pages/parkInfo/parkInfo?parkName=' + parkName,
    })
  },

  //长期租位
  memberDeals: function(e) {
    console.log("欢迎来到长期租位页面");
    var price = e.currentTarget.dataset.price;
    var carNo = e.currentTarget.dataset.carNo;
    var parkNo = e.currentTarget.dataset.parkNo;
    console.log("按月收费：", price);
    console.log("车牌号：", carNo);
    console.log("停车场编号：", parkNo);
    wx.navigateTo({
      url: '/pages/memberDeals/memberDeals?price=' + price + '&carNo=' + carNo + '&parkNo=' + parkNo + '&currCount=0&currPrice=0',
    })
  }
})