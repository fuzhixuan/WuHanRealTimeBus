// pages/busline/busline.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lineId: "",
    stops: [],
    buses: null,
    midViewImg: "",
    count: 0
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
      url: app.globalData.getStopsURL + lineId,
      success: function(res) {
        var stops = res.data.data.stops;
        var buses = res.data.data.buses;

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

    timeOut(that);
  }
});

function timeOut(that) {
  setTimeout(function () {
    var t = (that.data.count + 1) % (that.data.stops.length * 2 - 1);

    that.setData({
      midViewImg: "v",
      count: t
    });

    console.log(50);

    timeOut(that);
  }, 50);
}