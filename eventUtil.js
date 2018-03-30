//跨浏览器的事件处理程序
//跨浏览器的事件对象


var EventUtil = {

addHandler:function(element,type,handler){
	//首先判断是否存在DOM2级，其次判断是否存在IE中，最后判断是否存在DOM0级中
	//注意，现代浏览器中最后一种可能应该是不会走的
	if (element.addEventListener) {
		element.addEventListener(type,handler,false);
	} else if (element .attachEvent) {
		element.attachEvent("on"+type,handler);
	} else{
		element["on"+type] = handler;
	}
},

removeHandler:function(element,type,handler){

	if (element.removeEventListener) {
		element.removeEventListener(type,handler,false);
	}else if (element.detachEvent) {
		element.detachEvent("on"+type,handler);
	}else{
		element["on"+type] = null;
	}
},

getEvent:function(event){
	return event ? event : window.event;
},

getTraget:function(event){
	return event.target || event.srcElemnet;
},

preventDefault:function(event){
	if (event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
},


stopPropagation:function(event){
	if (event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
},

};

//使用示范

// var btn = document.getElementById("myBtn");
// var handler = function(){
// 	console.log('clicked');
// };
// EventUtil.addHandler(btn,"click",handler);







