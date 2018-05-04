document.write("<script language='javascript' src='eventUtil.js'></script>");


// 1,模拟鼠标事件
   var btn = document.getElementById("myBtn");
   //创建事件对象
   var event = document.createEvent("MouseEvents");
   //初始化事件对象
   event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
   //触发事件
   btn.dispatchEvent(event);

   //2,模拟键盘事件
   var textbox = document.getElementById("myText");

   if (document.implementation.hasFeature("KeyboardEvents","3.0")){
      event = document.createEvent("KeyboardEvent");
      //初始化事件
       event.initKeyboardEvent("keydown",true,true,document.defaultView,"a",0,"Shift",0);
   }
   //触发事件
   textbox.dispatchEvent(event);



   //除firefox浏览器外，创建一个通用的事件
   var textbox = document.getElementById("myTextBox");
   //创建事件对象
   var event = document.createEvent("Events");
   //初始化事件对象
   event.initEvent(type,bubbles,cancelable);
   event.view = document.defaultView;
   event.altKey = false;
   event.ctrlKey = false;
   event.shiftKey = false;
   event.metaKey = false;
   event.keyCode = 65;
   event.charCode = 65;

   //触发事件
   textbox.dispatchEvent(event);


   //自定义DOM事件
   var div = document.getElementById("myDiv"),event;
   EventUtil.addHandler(div,"myevent",function (event) {
      alert("DIV:"+event.detail);
   });

   EventUtil.addHandler(document,"myevent",function (event) {
      alert("DOCUMENT:"+event.detail);
   });

   if (document.implementation.hasFeature("CustomEvents","3.0")){

      event = document.createEvent("CustomEvent");
      event.initCustomEvent("myevent",true,false,"hai");
      div.dispatchEvent(event);
   }













