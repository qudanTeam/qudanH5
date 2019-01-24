// 微信内cookie存储数据有丢失的情况，所以在获取token的时候，如果cookie里取不到，
// 就用微信授权的scope=snsapi_base的授权登录方式授权并获取token，还是没有token的话，再跳转登录页面。

token = getCookie('token');
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  if (token == '') {
    var url = location.href.split('#').toString();
    console.log(url);
    // var REDIRECT_URI = encodeURIComponent(domain_test + url+'?type=1&isLoginAuthorize=0');
    var REDIRECT_URI = encodeURIComponent(url+'?type=1&isLoginAuthorize=0');
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
  }
} 
//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}