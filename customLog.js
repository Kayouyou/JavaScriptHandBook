


//一种跨浏览器向javascrpt控制台写入消息的入口
function log(message) {

    if (typeof console == "object"){
        console.log(message);
    }else if(typeof opera == "object"){
        opera.postError(message);
    }else  if(typeof java == "object" && typeof java.lang == "object"){
        java.lang.System.out.println(message);
    }
} 