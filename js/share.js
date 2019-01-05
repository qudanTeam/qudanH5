
var shareid, link;
var protocol = window.location.protocol;
var host = window.location.host;
var id = getQueryString('id');
var ptype = getQueryString('ptype');
var detail;
shareid = document.body.getAttribute("data-shareid");
function wxConfig(Data) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: Data.data.appId, // 必填，公众号的唯一标识
    timestamp: Data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: Data.data.noncestr, // 必填，生成签名的随机串
    signature: Data.data.signature,// 必填，签名
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
  });
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    if (ptype == 1) {
      link = protocol + '//' + host + '/applyCardShare.html?id=' + id + '&shareid=' + document.body.getAttribute("data-shareid")// 
    }
    if (ptype == 2) {
      link = protocol + '//' + host + '/applyLoanShare.html?id=' + id + '&shareid=' + document.body.getAttribute("data-shareid")// 
    }
    var shareData = {
      title: detail.product.productName, // 分享标题
      desc: detail.shares[0].content, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: detail.product.logo, // 分享图标
      success: function () {
        // 设置成功
        var data = JSON.stringify({
          shareid: document.body.getAttribute("data-shareid")
        });
        Ajax_token(IP + 'msqudan/api/user/share/addcounturl', "POST", token, data, addShareCount);//增加用户分享次数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    };
    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData(shareData);
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx.updateTimelineShareData(shareData);
  });
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}

AjaxGet(IP + 'msqudan/api/product/' + id, getDetail);
function getDetail(Data) {
  if (Data.code == 200) {
    detail = Data.data.detail;
    //设置商品海报图片
    var proPoster = document.querySelector(".content-poster-share");
    if(proPoster){
      document.querySelector(".content-poster-share").style.backgroundImage = 'url('+detail.product.productPoster+')';
    }
  }
}


function addShareCount(Data) {
  if (Data.code == 200) {
    console.log("增加用户分享次数成功！");
  }
}
function ajaxWxjsapi(url, data, callback) {
  $.ajax({
    url: url,
    type: "GET",
    data: { url: data },
    dataType: 'json',
    success: callback,
    error: function (e) {
      console.log($.parseJSON(e.responseText));
      layerMsg($.parseJSON(e.responseText).error.message);
    }
  })
}