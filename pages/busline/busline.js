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
    midViewImg: "/images/down.png",
    midViewImgRed: "/images/down-red.png",
    count: 0,
    animTimer: null,
    refreshClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    clearInterval(this.data.animTimer);

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
  },
  onUnload: function(options) {
    clearInterval(this.data.animTimer);
  },
  refreshClicked: function(e) {
    console.log(e);
    if (this.data.lineId != "") {
      clearInterval(this.data.animTimer);

      this.setData({
        refreshClicked: true
      });
      var that = this;

      wx.request({
        method: "GET",
        url: app.globalData.getStopsURL + that.data.lineId,
        success: function(res) {
          var stops = res.data.data.stops;
          var buses = res.data.data.buses;

          that.setData({
            stops: stops,
            buses: buses
          });
        },
        fail: function(res) {
          console.log("出现错误：" + res);
        }
      });

      var tmpTimeOut = setTimeout(function() {
        that.setData({
          refreshClicked: false
        });
        clearInterval(tmpTimeOut);
      }, 100);

      timeOut(that);
    }
  }
});

function timeOut(that) {
  that.data.animTimer = setTimeout(function() {
    var t = (that.data.count + 1) % (that.data.stops.length * 2 - 1);

    that.setData({
      count: t
    });

    timeOut(that);
  }, 50);
}