(function(window){
  var document = window.document,
  docEl = document.documentElement,
  psd = 375,
  dpr = 1,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function (){
      var width = docEl.clientWidth;
    //   if(width/dpr > psd){
    //       width = psd * dpr;
    //   }
      docEl.dataset.width = width;
      docEl.dataset.persent = 100 * (width / psd);
      docEl.style.fontSize = 100 * (width / psd)+'px';
  };
  recalc();
  if(!document.addEventListener) return;
  window.addEventListener('resizeEvt' , recalc, false);
})(window);
// 1rem=100px