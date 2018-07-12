// pages/parkOwnerManage/parkOwnerManage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkNo:'',
    authorty:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    console.log("进入停车场功能管理页面===",res);
    this.setData({
      parkNo:res.parkNo,
      authorty: app.globalData.authorty
    })
    wx.setNavigationBarTitle({
      title: '停车场管理'
    })
  },
  updateFee:function(){
    console.log("准备进入修改计费规则页面===", this.data);
    wx.navigateTo({
      url: '/pages/updateFeeInfo/updateFeeInfo?parkNo=' + this.data.parkNo
    })
  },
  audit:function(){
    console.log("准备进入白名单审核页面===", this.data);
    wx.navigateTo({
      url: '/pages/auditInfo/auditInfo?parkNo=' + this.data.parkNo
    })
  },
  parking:function(){
    console.log("准备进入在停车辆管理页面===", this.data);
    wx.navigateTo({
      url: '/pages/parkingManage/parkingManage?parkNo=' + this.data.parkNo
    })
  },
  paySum:function(){
    console.log("准备进入缴费汇总查看页面===", this.data);
    wx.navigateTo({
      url: '/pages/paySumManage/paySumManage?parkNo=' + this.data.parkNo
    })
  }
})