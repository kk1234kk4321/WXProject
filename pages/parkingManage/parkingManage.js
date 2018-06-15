const app = getApp()
Page({
  data: {
    array: {},
    parkNo: '',
    carNo:''
  },
  onLoad(res) {
    this.setData({
      parkNo: res.parkNo,
      carNo:''
    }),
      wx.setNavigationBarTitle({
        title: '在停车辆管理'
      })
  },
  onShow() {
    var that = this
    var parkNo = that.data.parkNo
    var carNo = that.data.carNo
    if(carNo==''){
      carNo = null;
    }
    wx.request({
      url: app.globalData.url + '/park/parking/parkNo/' + parkNo+'/carNo/'+carNo,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用在停车辆列表接口成功")
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
  carNoInput: function (e) {
    var carNo = e.detail.value;
    console.log('监听输入框文本，carNo=',carNo);
    this.setData({
      carNo: carNo
    })
  },
  searchCar:function(e){
    console.log('监听搜索框文本，carNo=', this.data.carNo);
    this.onShow();
  }
})