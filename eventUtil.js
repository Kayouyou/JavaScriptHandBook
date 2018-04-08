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

//返回对event对象的引用，这一行代码放在这里就可以确保随时都能使用event对象，而不必担心用户使用什么浏览器
getEvent:function(event){
	return event ? event : window.event;
},

//它返回事件的目标，在这个方法中，会检测event对象的target的属性，如果存在则返回对象属性的值，
//如果不存在则返回srcElement属性的值
getTraget:function(event){
	return event.target || event.srcElemnet;
},

//用于取消事件的默认行为，会检查是否存在preventDefault方法，如果存在则调用改方法
//如果不存在，则将returnValue设置为false
preventDefault:function(event){
	if (event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
},

//首先尝试使用DOM方法截断事件流，否则使用cancelBubble属性
stopPropagation:function(event){
	if (event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
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

//跨浏览器获得相关元素的方法
getRelatedTarget:function(event){
	if (event.relatedTarget) {
		return event.relatedTarget;
	}else if (event.toElement) {
		return event.toElement;
	}else if (event.fromElement) {
		return event.fromElement;
	}else{
		return null;
	}
},


//检测鼠标按钮
getButton:function(event){

	if (document.implementation.hasFeature("MouseEvents","2.0")) {
		return event.button;
	}else{
		switch(event.button){
			case 0:
			case 1:
			case 3:
			case 5:
			case 7:
			return 0;
			case 2:
			case 6:
			return 2;
			case 4:
			return 1;
		}
	}
},

//获取字符编码
getCharCode:function(event){
	if (typeof event.charCode == "function") {
		return event.charCode;
	}else{
		return event.keyCode;
	}
},


//获取剪切板文本
getClipboardText:function (event) {
	var clipboardData = (event.clipboardData || window.clipboardData);
	return clipboardData;
},

//设置剪切板文本
setClipboardText:function (event) {
	if (event.clipboardData){
		//Safari Chrome 是 text/plain
		return event.clipboardData.setData("text/plain",value);
	}else if(window.clipboardData){
		//IE 是text
		return window.clipboardData.setData("text",value);
	}
}


};

//使用示范

// var btn = document.getElementById("myBtn");
// var handler = function(){
// 	console.log('clicked');
// };
// EventUtil.addHandler(btn,"click",handler);

//以下代码展示了怎样为script元素指定事件处理程序
// EventUtil.addHandler(window,"load",function(){
// 	var script = document.createElement("script");
// 	EventUtil.addHandler(script,"load",function(){
// 		console.log('script  loaded');
// 	}),
// 	script.src = "example.js";
// 	document.body.appendChild(script);
// });


//给text添加事件

// var textbox = document.getElementById("***text");
// EventUtil.addHandler(textbox,"textinput",function(event){
// 	event = EventUtil.getEvent(event);
// 	//输出的就是text的文本框输入内容
// 	console.log(event.data);
// });












