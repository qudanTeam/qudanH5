var flagGetToken = a();
function a() {
  // alert("getTokenjs:"+flagGetToken)
  if (getCookie("flagGetToken")==1) {
    document.cookie = "flagGetToken='';path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return 1;
  } else {
    return 0;
  }
};
console.log(flagGetToken);
var token = getCookie('token');
var ua = navigator.userAgent.toLowerCase();
if ((flagGetToken == 0) && (ua.match(/MicroMessenger/i) == "micromessenger") && (token == '')) {
    var pathName = window.location.href;//获取当前页面地址，授权后返回到此页面
  var REDIRECT_URI = encodeURIComponent(domain_test + 'blankGetToken.html?type=1&isLoginAuthorize=0&flagGetToken=1&pathName='+pathName);
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
  flagGetToken = 1;
  // alert("getTokenjs:"+flagGetToken)
} else {
  flagGetToken = 1;
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