var token = getCookie('token');
var menu_vip = document.querySelector(".vip");
var menu_usermain = document.querySelector(".usermain");
if (token == '') {//未登录
  if (menu_vip != null) {
    menu_vip.setAttribute("href", "login.html")
  }
  if (menu_usermain != null) {
    menu_usermain.setAttribute("href", "login.html")
  }

} else {//登录情况下获取用户信息，判断是否代理
  if (menu_vip != null) {
    menu_vip.setAttribute("href", "vip.html")
  }
  if (menu_usermain != null) {
    menu_usermain.setAttribute("href", "userMain.html")
  }
}
// 确认弹框
function layerConfirm(content, btnName, callback) {
  layer.open({
    content: content,
    className: 'layer-confirm',
    btn: [btnName, '取消'],
    yes: callback
  })
}
// html弹框
function layerHtml(className, content) {
  layer.open({
    type: 1,
    content: content,
    className: 'layer-html ' + className,
    shadeClose: false,
    success: function (elem) {
      var index = elem.getAttribute("index");
      $(".icon-close").click(function () {
        layer.close(index);
      })
    }

  })
}
//底部分享
function layerShare() {
  layer.open({
    content: '<div class="flex-wrap"><div class="flex-wrap wechat"><img class="wechat" src="images/icon-wechat2.png"/><div class="text">微信好友</div></div><div class="flex-wrap pyq"><img class="wechat" src="images/icon-pyq.png"/><div class="text">朋友圈</div></div><div class="flex-wrap qq"><img class="wechat" src="images/qqicon@2x.png"/><div class="text">QQ好友</div></div><div class="flex-wrap qq-zone"><img class="wechat" src="images/qq-zone.png"/><div class="text">QQ空间</div></div></div>',
    className: "my-footer-share"
    , btn: ['取消']
    , skin: 'footer'
    , no: function (index) {
      layer.open({ content: '执行删除操作' })
    }
  });
}

// 提示弹框
function layerMsg(content) {
  layer.open({
    content: content,
    className: "layer-msg",
    skin: 'msg'
    , time: 2 //2秒后自动关闭
  })
}
function Ajax(url, data, callback) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    data: data,
    success: callback,
    error: function (e) {
      console.log($.parseJSON(e.responseText));
      layerMsg($.parseJSON(e.responseText).error.message);
    }
  })
}
function AjaxGet(url, callback) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    success: callback,
    error: function (e) {
      console.log($.parseJSON(e.responseText));
      layerMsg($.parseJSON(e.responseText).error.message);
    }
  })
}
function Ajax_token(url, type, token, data, callback) {
  $.ajax({
    url: url,
    type: type,
    dataType: 'json',
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    },
    data: data,
    success: callback,
    error: function (e) {
      console.log($.parseJSON(e.responseText));
      layerMsg($.parseJSON(e.responseText).error.message);
    }
  })
}
//获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
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
//获取验证码
function getCode(_this, type, token) {
  var mobile = document.querySelector('.mobile').value;
  var timeWrap = document.querySelector(".time-wrap");
  var time = timeWrap.querySelector('.time');
  var t = 60;
  var data;
  console.log(mobile);
  if (mobile == '') {
    layerMsg('请输入手机号');
    return false;
  }
  if (!(/^1[34578]\d{9}$/.test(mobile))) {
    layerMsg("请输入正确的手机号");
    return false;
  }
  _this.style.display = "none";
  timeWrap.style.display = "block";
  var st = setInterval(function () {
    t--;
    if (t < 10) {
      t = "0" + t;
    }
    if (t == 0) {
      clearInterval(st);
      _this.style.display = "block";
      timeWrap.style.display = "none";
      t = 60;
    }
    time.innerText = t;

  }, 1000);
  var data = JSON.stringify({
    mobile: mobile,
    type: type
  });
  console.log(typeof data);
  Ajax_token(IP + 'msqudan/api/validcode', "POST", token, data, getVcode);
}

function getVcode(Data) {
  if (Data.code == 200) {
    console.log("获取验证码成功！");
  }
}
//微信内打开二级页面，不显示标题栏
var header = document.getElementById("header");
is_wexin();
function is_wexin() {
  var ua = navigator.userAgent.toLowerCase();

  if (header) {
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      document.getElementById("header").className = "hidden";
    } else {
      document.getElementById("header").className = "";
    }
  }
}
//标题栏返回按钮添加返回事件
if (header) {
  var iconBack = header.querySelector(".icon-back");
  iconBack.addEventListener("click", function () {
    history.back();
  })
}
