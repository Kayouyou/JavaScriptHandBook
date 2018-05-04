document.write("<script language='javascript' src='eventUtil.js'></script>");

// require('eventUtil.js');

EventUtil.addHandler(window,"load",function(event){
	var div = document.getElementById("myDiv");
	EventUtil.addHandler(div,"contextmenu",function(event){
		event = EventUtil.getEvent(event);
		EventUtil.preventDefault(event);
		var menu = document.getElementById("myMenu");
		menu.style.left =event.clientX + "px";
		menu.style.top = event.clientY + "px";
		menu.style.visibility = "visible";
	});
	EventUtil.addHandler(document,"click",function(event){
		document.getElementById("myMenu").style.visibility = "hidden";
	});
});

//添加beforeUnload事件
EventUtil.addHandler(window,"beforeunload",function(event){
	event = EventUtil.getEvent(event);
	var message = "I am really going to miss you if you go"
	event.retuenvalue = message;
	return message;
});





