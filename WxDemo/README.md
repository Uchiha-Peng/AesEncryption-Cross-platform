# WxMD5QrCode
#### 实现的功能，纯本地JS在微信小程序中实现字符串MD5加密，并通过Canvas动态创建二维码

1. 添加qrcode.js、md5.js到utils文件夹中
  ![Alt text](/WxDemo/ScreenShot/screen1.PNG)
2. 在需要试用的js前引用，要放在Page方法外部
``` // pages/main/index.js
   var QR = require("../../utils/qrcode.js");
   var md5 = require("../../utils/md5.js");
   var util = require("../../utils/util.js"); 
```
3. MD5加密

> 传入字符串参数即可——md5(dateStr)   ` md5即为引用该js时设置的值 `

![Alt text](/WxDemo/ScreenShot/screen2.PNG)
4. 通过Canvas动态创建二维码

>  前端页面中Canvas组件，代码如下

```
<view class="container">
    <view class="img-box">
        <canvas canvas-id="mycanvas"/>
    </view>
</view>
```

> js调用方法 QR.qrApi.draw(md5value, "mycanvas", 300, 300) 其中参数分别代表(二维码的文本值，Canvas的ID，二维码的宽度，二维码的高度，)

5. 结果如图

![Alt text](/WxDemo/ScreenShot/screen3.PNG)