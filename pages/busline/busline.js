// pages/busline/busline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lineId: "",
    stops: [],
    buses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var lineId = options.lineId;
    this.setData({
      lineId: lineId
    });
    var that = this;

    wx.request({
      method: "GET",
      url: 'http://127.0.0.1:8080/realTimeBus/getRealBusInfo?lineId=' + lineId,
      success: function(res) {
        var stops = res.data.data.stops;
        var tmp = res.data.data.buses;
        var buses = [];
        for (var i = 0; i < tmp.length; i++) {
          var bus = tmp[i].split("|");
          buses[i] = bus;
        }
        console.log(buses);

        that.setData({
          stops: stops,
          buses: buses
        });
      },
      fail: function(res) {
        console.log("出现错误：" + res);
      }
    });
  }
})