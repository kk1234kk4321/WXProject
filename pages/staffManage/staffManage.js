// pages/staffManage/staffManage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkNo: '',
    nickname: '',
    staffList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      parkNo: res.parkNo,
    })

    wx.setNavigationBarTitle({
      title: '员工管理',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var parkNo = that.data.parkNo
    var openid = app.globalData.openId

    console.log("parkNo：", parkNo)
    console.log("openid：", openid)
    wx.request({
      url: app.globalData.url + '/car/weixin/staffList/parkNo/' + encodeURI(parkNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用员工列表接口成功")
        console.log("staffList====>", res.data.data)
        if (res.data != '') {
          that.setData({
            staffList: res.data.data
          })
        } else {
          that.setData({
            staffList: ''
          })
        }
      }
    })
  },

  /**
   * 监听文本框输入
   */
  nicknameInput: function(e) {
    var nickname = e.detail.value;
    this.setData({
      nickname: nickname
    })
  },

  /**
   * 搜索昵称
   */
  searchNickname: function(e) {
    console.log("监听文本框输入，nickname=", this.data.nickname)
    var that = this
    var parkNo = that.data.parkNo
    var nickname = that.data.nickname
    var openid = app.globalData.openId
    var type = 1 //1:微信注册

    console.log("昵称：", nickname)
    console.log("parkNo：", parkNo)
    console.log("openid：", openid)
    wx.navigateTo({
      url: '/pages/staffSearchNickname/staffSearchNickname?nickname=' + nickname + '&parkNo=' + parkNo
    })
  },

  /**
   * 移除员工
   */
  deleteStaff: function(e) {
    var that = this
    var parkId = e.currentTarget.dataset.parkId
    var nickname = e.currentTarget.dataset.nickname
    console.log("parkId=", parkId)
    console.log("nickname=", nickname)

    wx.request({
      url: app.globalData.url + '/staff-manage/deleteStaff/nickname/' + nickname + '/parkId/' + parkId,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用删除员工接口")
        console.log("删除员工成功")

        that.onShow();
      }
    })
  }
})