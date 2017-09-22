// pages/main/index.js
var QR = require("../../utils/qrcode.js");
var md5 = require("../../utils/md5.js");
var util = require("../../utils/util.js");
Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var dateStr = util.formatTime(new Date) + "yunstorm";
    console.info(dateStr);
    var md5value = md5(dateStr).substr(0, 21);
    console.info(md5value);
    var size = this.setCanvasSize();//动态设置画布大小
    this.createQrCode(md5value, "mycanvas", size.w, size.h);
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 550;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (value, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(value, canvasId, cavW, cavH);

  }
})