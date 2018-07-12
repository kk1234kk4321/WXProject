const app = getApp()
// pages/memberDeals/memberDeals.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currCount: 0,
    count: 0,
    addColor: '#00A6D6',
    minusColor: '#00A6D6',
    price: 0,
    currPrice: 0,
    totalPrice: 0,
    carNo: '',
    parkNo: '',
    applyCar: '',
    carMember: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    console.log("res====>", res);
    wx.setNavigationBarTitle({
      title: '长期租位'
    })
    var addColor = '#00A6D6';
    var minusColor = '#00A6D6';
    var startTime = new Date();
    console.log("起始时间：", startTime);
    if (res.currCount < res.count) {
      addColor = '#00A6D6';
    }
    if (res.currCount > 0) {
      minusColor = '#00A6D6'
    }
    this.setData({
      currCount: res.currCount,
      minusColor: minusColor,
      addColor: addColor,
      price: res.price,
      currPrice: res.currPrice,
      parkNo: res.parkNo,
      carNo: res.carNo
    });
  },
  //生命周期函数 -- 监听页面显示
  onShow() {
    var that = this;
    var openId = app.globalData.openId;
    var carNo = that.data.carNo;
    var parkNo = that.data.parkNo;

    wx.request({
      url: app.globalData.url + '/car/weixin/status/openId/' + encodeURI(openId) + '/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo),
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("申请状态===>", res.data.data);
        that.setData({
          applyCar: res.data.data,
        })
      }
    })
  },
  add(event) {
    var data = event.target.dataset;
    console.log("add触发事件：", data);
    var unitPrice = data.price;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    currCount = parseInt(currCount + 1);
    currPrice = parseFloat(currPrice) + parseFloat(unitPrice);
    data.currCount = currCount;
    data.currPrice = currPrice;
    this.onLoad(data);
    console.log("add触发事件结束：", data);

    var that = this;
    var carNo = that.data.carNo;
    var parkNo = that.data.parkNo;
    console.log("车牌号：", carNo);
    console.log("停车场编号：", parkNo);
    console.log("月份：", currCount);
    wx.request({ //获取起始和截止时间
      url: app.globalData.url + '/car/weixin/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo) + '/count/' +  currCount,
      method: 'GET',
      data: {},
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(e) {
        console.log("获取起始和截止时间：", e.data.data);
        that.setData({
          carMember: e.data.data,
        })
      }
    })
  },
  minus(event) {
    var data = event.target.dataset;
    console.log("minus触发事件：", data);
    var unitPrice = data.price;
    var currCount = data.currCount;
    var currPrice = data.currPrice;

    if (currCount > 0) {
      currCount = parseInt(currCount - 1);
      currPrice = parseFloat(currPrice) - parseFloat(unitPrice);
      data.currCount = currCount;
      data.currPrice = currPrice;
      this.onLoad(data);
      console.log("minus触发事件结束：", data);

      var that = this;
      var carNo = that.data.carNo;
      var parkNo = that.data.parkNo;
      console.log("车牌号：", carNo);
      console.log("停车场编号：", parkNo);
      console.log("月份：", currCount);
      wx.request({
        url: app.globalData.url + '/car/weixin/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo) + '/count/' + currCount,
        method: 'GET',
        data: {},
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        success: function (e) {
          console.log("获取起始和截止时间：", e.data.data);
          that.setData({
            carMember: e.data.data,
          })
        }
      })
    } 
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    var fee = e.detail.value.dealsFee;
    var count = e.detail.value.count;
    var openId = app.globalData.openId;
    var carNo = e.detail.target.dataset.carNo;
    var parkNo = e.detail.target.dataset.parkNo;
    var price = e.detail.target.dataset.price;
    var that = this
    that.generateOrder(openId, (fee * 100).toFixed(), carNo, parkNo, count, price);
    //登陆获取code   
    /*wx.login({
      success: function (res) {
        console.log(res.code)
        //获取openid   
        that.getOpenId(res.code,fee)
      }
    });*/
  },
  /**生成商户订单 */
  generateOrder: function (openId, fee, carNo, parkNo, count, price) {
    console.log('生成商户订单')
    console.log('openId=', openId)
    console.log('fee=', fee)
    var that = this
    var title = 'test'
    //统一支付   
    wx.request({
      url: app.globalData.url + '/car/weixin/pay/openid/' + openId + '/title/' + title + '/fee/' + fee,
      method: 'GET',
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("调用接口成功")
        console.log(res)
        //发起支付   
        var timeStamp = res.data.data.timeStamp;
        console.log("timeStamp:" + timeStamp)
        var packages = res.data.data.package;
        console.log("package:" + packages)
        var paySign = res.data.data.paySign;
        console.log("paySign:" + paySign)
        var nonceStr = res.data.data.nonceStr;
        console.log("nonceStr:" + nonceStr)
        var tradeNo = res.data.data.tradeNo;
        var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr, "tradeNo": tradeNo };
        that.pay(param, carNo, parkNo, openId, count, fee, price)
      },
      fail: function (res) {
        console.log("接口调用失败")
        console.log(res)
      }
    })
  },
  /* 支付   */
  pay: function (param, carNo, parkNo, openId, count, fee, price) {
    console.log("支付")
    console.log(param)
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        // success   
        console.log("支付成功")
        console.log(res)

        wx.request({
          url: app.globalData.url + '/car/weixin/membersPay/openid/' + openId + '/tradeNo/' + param.tradeNo + '/fee/' + fee + '/carNo/' + encodeURI(carNo) + '/parkNo/' + parkNo + '/count/' + count + '/price/' + price,
          method: 'GET',
          header: {
            "content-type": 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.redirectTo({
              url: '/pages/payFeets/payFeets?plateNum=' + carNo,
              success: function (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      fail: function (res) {
        // fail   
        console.log("支付失败")
        console.log(res)
        wx.showToast({
          title: '支付失败',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: function () {
        // complete   
        console.log("pay complete")
      }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //申请通行证
  applyCar: function(e) {
    console.log("您正在申请通行证，需要审核？请耐心等候...")
    var openId = app.globalData.openId; 
    var carNo = e.currentTarget.dataset.carNo;
    var parkNo = e.currentTarget.dataset.parkNo;
    var price = e.currentTarget.dataset.price;
    console.log("openId：", openId);
    console.log("车牌：", carNo);
    console.log("停车场编号：", parkNo);
    var that = this;

    wx.request({
      url: app.globalData.url + '/car/weixin/openId/' + encodeURI(openId) + '/carNo/' + encodeURI(carNo) + '/parkNo/' + encodeURI(parkNo),
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("调用接口成功")
        console.log("applyCar====>", res.data.data);
        
        wx.redirectTo({
          url: '/pages/applyCar/applyCar?price=' + price + '&carNo=' + carNo + "&parkNo=" + parkNo
        })
      }
    })
  }
})