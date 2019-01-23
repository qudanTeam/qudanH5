// 微信内cookie存储数据有丢失的情况，所以在获取token的时候，如果cookie里取不到，
// 就用微信授权的scope=snsapi_base的授权登录方式授权并获取token，还是没有token的话，再跳转登录页面。

token = getCookie('token');
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  if (token == '') {
    var REDIRECT_URI = encodeURIComponent(domain_test + 'blankGetToken.html?type=1&isLoginAuthorize=0');
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5937eccb3b4a99d7&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
  }
} 
