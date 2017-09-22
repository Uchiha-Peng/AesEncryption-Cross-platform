var QR = require("../../utils/qrcode.js");
var util = require("../../utils/util.js");
var crypto = require('../../utils/aes.js')
//十六位十六进制数作为秘钥
var key = crypto.CryptoJS.enc.Latin1.parse('3454345434543454');
//十六位十六进制数作为秘钥偏移量
var iv =  crypto.CryptoJS.enc.Latin1.parse('6666666666666666');
Page({
  data: {
    Second: 30
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var that = this;
    var timeSpan = this.data.Second;
    //手机号|openid|用户类型|客户端类型|公司ID
    //执行一次
    that.CreateStr();
    var Task = setInterval(function () {
      that.CreateStr();
    }, 30000);

    var SeconTask = setInterval(function () {
      if (timeSpan == 1) {
        timeSpan = 30
      }
      else {
        timeSpan = timeSpan - 1;
      }
      that.setData({ Second: timeSpan });
    }, 1000);
  },
  onShow: function () {
    var that = this;
    var word = "你叫MINA？";
    var pwd = that.Encrypt(word)
    console.info("打印出来");
    console.info(pwd);
    console.info("再帮我解密！");
    var str = that.Decrypt(pwd);
    console.info(str);
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
  //生成二维码
  createQrCode: function (value, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(value, canvasId, cavW, cavH);

  },
  //AES加密
  Encrypt: function (word) {
    var encrypted = crypto.CryptoJS.AES.encrypt(word, key, {
      iv: iv,
      mode: crypto.CryptoJS.mode.CBC,
      padding: crypto.CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
  },
  //AES解密
  Decrypt: function (word) {
    var decrypted = crypto.CryptoJS.AES.decrypt(word, key, { iv: iv, padding: crypto.CryptoJS.pad.ZeroPadding });
    return decrypted.toString(crypto.CryptoJS.enc.Utf8)
  },
  //获取加密字符串生成二维码
  CreateStr: function () {
    var that = this;
    var timeStr = util.formatTime(new Date);
    var phone = "18671920627";
    var openid = "o9vEe0cDAOrrsB6Im5bibKbBZP2A";
    var userType = "0";
    var clientType = "1";
    var companyID = "1001";
    var word = timeStr + "|" + phone + "|" + openid + "|" + userType + "|" + clientType + "|" + companyID;
    console.info(word);
    var AesValue = that.Encrypt(word);
    console.info(AesValue);
    console.info(AesValue.substr(0, 20));
    var size = that.setCanvasSize();//动态设置画布大小
    that.createQrCode(AesValue.substr(0, 20), "mycanvas", size.w, size.h);
  }
})