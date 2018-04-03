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


//利用focus来修改文本框的背景颜色，可以利用blur事件来恢复 文本框的背景颜色，利用change事件在用户输入非数值字符时再次修改背景颜色

//focus事件处理程序将文本框的背景颜色改为黄色
var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox,"focus",function (event) {
   event = EventUtil.getEvent(event);
   var target = EventUtil.getTraget(event);
   if (target.style.backgroundColor != "red") {
       target.style.backgroundColor = "yellow";
   }
});

//onblur & onchange 事件则会在发现非数值字符时，将文本框背景颜色改为红色
EventUtil.addHandler(textbox,"blur",function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTraget(event);
    if (/[\d]/.test(target.value)) {
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }
});

EventUtil.addHandler(textbox,"change",function (event) {
   event = EventUtil.getEvent(event);
   var  target = EventUtil.getTraget(event);
    if (/[\d]/.test(target.value)) {
        target.style.backgroundColor = "red";
    } else {
        target.style.backgroundColor = "";
    }
});


//文本框脚本
//选择文本
var textbox = document.forms[0].elements["textbox"];
textbox.select();

//文本框只要获得了焦点，就会选择其中所有的文本，这种表单可以大幅度提高表单的易用性
EventUtil.addHandler(textbox,"focus",function (event) {
   event = EventUtil.getEvent(event);
   var target = EventUtil.getTraget(event);
   target.select();
});

//与select（）方法对应的是一个select事件，选择文本框的文本时就会触发select事件
EventUtil.addHandler(textbox,"select",function (event) {

    console.log("text selected" + textbox,value);
});


//取得选择的文本
function getSelectedText(textbox) {

    if (typeof  textbox.selectionStart == "number"){
        return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    }else if(document.selection) {
        return document.selection.createRange().text;
    }
}


//文本选择的效果
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange){
        textbox.setSelectionRange(startIndex,stopIndex);
    }else if (textbox.createRange){
        var range = textbox.createRange();
        range.collapse(true);
        range.moveStart("character",startIndex);
        range.moveEnd("character",stopIndex-startIndex);
        range.select();
    }
    //要在文本框中看到文本选择的效果，必须让文本框获得焦点
    textbox.focus();
}

textbox = "hello world";
//获取所有的文本
selectText(textbox,0,textbox.value.length);
//获取前三个文本
selectText(textbox,0,3);
//获得第4个到第6个字符
selectText(textbox,4,7);


//过滤输入 如果需要确保粘贴到文本框中的文本包含某些字符，或者符合某种格式要求时，能够访问剪切板是非常有用的
//这里确保只要数值长度等于10 就会取消粘贴操作
EventUtil.addHandler(textbox,"paste",function (evenet) {
   evenet = EventUtil.getEvent(evenet);
   var text = EventUtil.getClipboardText(evenet);
   if (text.length == 10) {
       alert("粘贴文字过长");
       EventUtil.preventDefault(evenet);
   }
});






























