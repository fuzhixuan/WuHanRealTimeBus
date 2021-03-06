//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    busName: "",
    lines: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function(res) {

        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function(res) {}
      })
    }
  },
  busNameInput: function(e) {
    this.setData({
      busName: e.detail.value
    });

    if (this.data.busName != "") {
      setBusNames(this);
    } else {
      this.setData({
        lines: []
      });
    }
  },
  itemClick: function(e) {
    var lineId = e.currentTarget.dataset.lineid;
    wx.navigateTo({
      url: '../busline/busline?lineId=' + lineId,
    });
  },
  queryClick: function(e) {
    if (this.data.busName != "") {
      setBusNames(this);
    } else {
      this.setData({
        lines: []
      });
    }
  }
})

function setBusNames(that) {
  wx.request({
    method: "GET",
    url: app.globalData.getBusLinesURL + that.data.busName,
    success: function(res) {
      var lines = res.data.data.lines;
      console.log(lines);
      that.setData({
        lines: lines
      });
    },
    fail: function(res) {
      console.log("出现错误：" + res);
    }
  });
}