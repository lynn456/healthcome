//Full Bg----------------------------------------------------------------------
(function ($) {

	$.fn.tofullBg = function (option) {
		var current = this;
		
		var defaultSettings = {
            afterUpdate: false
        };
		
		 $.extend(defaultSettings, option);
		
		
		function init(){
			current.each(function () {
				var content = $(this).parent();
				var viewW = content.width();
				var viewH = content.height();
				var oriW = parseInt($(this).attr("data-oriW"));
				var oriH = parseInt($(this).attr("data-oriH"));
	
				if (viewW / viewH > oriW / oriH) {
	
					height = oriH * viewW / oriW;
					$(this).css({
						"width": viewW+"px",
						"height": height+"px",
						"margin-left": viewW / -2 + "px",
						"margin-top": height / -2 + "px",
						"left": "50%",
						"top": "50%",
						"position": "absolute"
					});
	
				} else {
	
					width = oriW * viewH / oriH;
					$(this).css({
						"width": oriW * viewH / oriH + "px",
						"height": viewH+'px',
						"margin-top": viewH / -2 + "px",
						"margin-left": width / -2 + "px",
						"left": "50%",
						"top": "50%",
						"position": "absolute"
					})
	
				}
				
				
				if (typeof defaultSettings.afterUpdate === "function") {
					defaultSettings.afterUpdate.apply(current);
                }
	
			})
		}
		

		
		$(window).bind("resize",function(){
			init();		   
		})
		
		$(window).trigger("resize");
	}

})(jQuery);



function openwindow(url,name,iWidth,iHeight){
  var url;     //網頁位置;
  var name;    //網頁名稱;
  var iWidth;  //視窗的寬度;
  var iHeight; //視窗的高度;
  var iTop = (window.screen.availHeight-30-iHeight)/2;  //視窗的垂直位置;
  var iLeft = (window.screen.availWidth-10-iWidth)/2;   //視窗的水平位置;
  window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',status=no,location=no,status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no');
}


//Form--------------------------------------------------------

function CheckMobile(TEL){     
	re = /^[09]{2}[0-9]{8}$/;
    if (!re.test(TEL)){
		return false;
	}else{
		return true;
	}
} 


function CheckEmail(obj){
	var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
	
	if (!emailRule.test(obj)){
		return false;
	}else{
		return true;
	}
}
