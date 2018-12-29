
/**
  * 初始化iScroll控件
  */
 function loaded() {
	var wrapper = document.getElementById('wrapper');
	var div = document.createElement("div");
	div.className = "scroller";
	wrapper.appendChild(div);

	var scroller = wrapper.querySelector(".scroller");
	var list = wrapper.querySelector("#wrapper div");
	scroller.insertBefore(list, scroller.childNodes[0]);

	var pullDown = document.createElement("div");
	pullDown.className = "pullDown";
	
	var span = document.createElement("span");
	span.className = 'pullDownIcon';
	pullDown.appendChild(span);

	var pullDownLabel = document.createElement("div");
	pullDownLabel.className = "pullDownLabel";
	pullDown.appendChild(pullDownLabel);
	scroller.insertBefore(pullDown, scroller.childNodes[0]);

	var pullUp = document.createElement("div");
	pullUp.className = "pullUp";
	
	var span = document.createElement("span");
	span.className = 'pullUpIcon';
	pullUp.appendChild(span);

	var pullUpLabel = document.createElement("div");
	pullUpLabel.className = "pullUpLabel";
	pullUpLabel.innerHTML = '';
	pullUp.appendChild(pullUpLabel);
	scroller.appendChild(pullUp);

	var pullDownEl = wrapper.querySelector(".pullDown");
	var pullDownOffset = pullDownEl.offsetHeight;
	var pullUpEl = wrapper.querySelector(".pullUp");
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
	 scrollbarClass: 'myScrollbar', /* 重要样式 */
	 useTransition: false,
	 topOffset: pullDownOffset,
	 onRefresh: function () {
		//  alert();
	  if (pullDownEl.className.match('loading')) {
		 
	   pullDownEl.className = 'pullDown';
	//    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
	   pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
	  } else if (pullUpEl.className.match('loading')) {
		
	   pullUpEl.className = 'pullUp';
	//    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
	   pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
	  }
	 },
	 onScrollMove: function () {
		//  console.log('this.y='+this.y)
		//  console.log('this.maxScrollY='+this.maxScrollY)
	  if (this.y > 0 && !pullDownEl.className.match('flip')) {
	   pullDownEl.className = 'flip';
	   pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
	   pullUpEl.querySelector('.pullUpLabel').style.display='block';
	   this.minScrollY = 0;
	  } else if (this.y < 5 && pullDownEl.className.match('flip')) {
	   pullDownEl.className = 'pullDown';
	   pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
	   this.minScrollY = -pullDownOffset;
	  } else if (this.y < 0 && !pullUpEl.className.match('flip')) {
	   pullUpEl.className = 'flip';
	   pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载';
	   this.maxScrollY = this.maxScrollY;
	  } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
	   pullUpEl.className = 'pullUp';
	   pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
	//    pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
	   this.maxScrollY = pullUpOffset;
	  }
	 },
	 onScrollEnd: function () {
	  if (pullDownEl.className.match('flip')) {
	   pullDownEl.className = 'loading';
	   pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
	   pullDownAction(); // Execute custom function (ajax call?)
	  } else if (pullUpEl.className.match('flip')) {
	   pullUpEl.className = 'loading';
	   pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
	   pullUpAction(); // Execute custom function (ajax call?)
	  }
	 }
	});
	// setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
   }
   //初始化绑定iScroll控件
   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
   document.addEventListener('DOMContentLoaded', loaded, false);
 