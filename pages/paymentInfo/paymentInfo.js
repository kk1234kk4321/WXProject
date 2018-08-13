const app = getApp()

Page({
  data: {
    paymentInfo: [],
    plateNum: null,
    
  },
 
  onLoad(res) {
    console.log('车牌号为：', res.plateNum)
    this.setData({
      plateNum: res.plateNum
    })
    var that = this;
    console.log("url====>", app.globalData.url + '/car/weixin/recordHis/carno/' + encodeURI(res.plateNum))
    wx.request({
      url: app.globalData.url + '/car/weixin/recordHis/carno/' + encodeURI(res.plateNum),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log("在线缴费记录====>", res)
        var a=0;
        if(res.data.data){
          var ss = [];
          for(a=0;a<500;a++){
            // ss=[];
            ss.push(res.data.data[a]);
            
          }
          that.setData({
            // pageIndex:that.data.pageIndex+1,
            paymentInfo: ss
          })
          // console.log("paymentInfo=================================>" + that.data.paymentInfo)
        }else{
          that.setData({
            paymentInfo: ''
          })
          // console.log("paymentInfo=================================>" + that.paymentInfo)
        }
      }
    })
      wx.setNavigationBarTitle({
        title: '历史记录'
      })
  },
 
  
})