document.write("<script language='javascript' src='eventUtil.js'></script>");

//表单

//避免多次提交
EventUtil.addHandler(form,"submit",function (event) {
   event = EventUtil.getEvent(event);
   var target = EventUtil.getTraget(event);
   //取得提交按钮
    var btn = target.elements["submit-btn"];
    //禁用它
    btn.disabled = true;
});