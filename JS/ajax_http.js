

function cretaeXHR() {

    //先检测原生对象是否存在
    if (typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    }else if (typeof ActiveXObject != "undefined"){
        //在检测 activeX对象
        if (typeof arguments.callee.activeXString != "string"){
            var version = ["MSXML2.XMLHttp6.0","MSXML2.XMLHttp3.0","MSXML2.XMLHttp"],i,len;
            for (i=0,len=version.length;i<len;i++) {
                try {
                    new ActiveXObject(version[i]);
                    arguments.callee.activeXString = version[i];
                    break;
                } catch (e) {

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else {
        //如果都不存在就抛出一个错误
        throw new Error("No XHR object available");
    }
}


//辅助get添加参数方法
function addURLParam(url,name,value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "+" + encodeURIComponent(value);
    return url;
}

var xhr = cretaeXHR();
//必须在open之前指定readystatechange事件，可以利用这个事件来检测每次状态变化后readystate的值
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4){
        //如果超时后再访问status属性，就会导致错误，为避免，将检查status属性放在try catch语句当中。
        try{
            if (xhr.status >= 200 && xhr.status < 300 && xhr.status == 304){
                alert(xhr.responseText);
            }else {
                alert("Request was unsuccessful:"+xhr.status);
            }
        }catch(e){
            //假设由于timeout事件处理
        }
    }
}


//load  progress事件
xhr.onload = function (event) {
    if (xhr.status >= 200 && xhr.status < 300 && xhr.status == 304){
        alert(xhr.responseText);
    }else {
        alert("Request was unsuccessful:"+xhr.status);
    }
};

xhr.onprogress = function (event) {
    var divstatus = document.getElementById("status");
    if (event.lengthComputable){
        divstatus.innerHTML = "Received" + event.position + "of" + event.total + "bytes";
    }
};

//三个参数，请求类型；请求的URL；是否异步发送的bool
xhr.open("get","&&&&&.php",true);
//关于URL说明两点：URL是相对于代码的当前页面（也可以使用绝对路径）；调用open并不会真正的发送请求，而只是启动一个请求以备发送
//只能向同一个域中使用相同端口和协议的URL发送请求，如果URL与启动请求的页面有任何差别，就会引发错误

//超时设置为1秒
xhr.timeout = 1000;

xhr.ontimeout = function () {
  alert("Reuqest did not return in a second");
};

//GET请求 查询字符串中每个参数的名称和值都必须使用encodeUrlComponent进行编码，然后才可以放到URL末尾

//关于HTTP的头部信息 setRequestHeader必须在open之后和send之前
xhr.setRequestHeader("myheader","myvalue");

//获取头部信息
var myHeader = xhr.getResponseHeader("myheader");

/*
如果，服务器返回的mime 类型是text/plain，但数据中实际包含的是XML
根据mime类型，即使数据是XML，responseXML依然是null
通过调用overridemimetype方法，可以保证把响应当作XML而非纯文本来处理
*/
//overrideMimeType方法
xhr.overrideMimeType("text/xml");


//发送数据，
xhr.send("hello");

//在接收到响应之前还可以调用abort方法来取消异步请求
xhr.abort();


//用xhr对象实现HTTP流的典型代码

function createStreamingClient(url,process,finished) {
  var xhr = new  XMLHttpRequest(),
      received = 0;
  xhr.open("get",url,true);
  xhr.onreadystatechange = function () {
    var  result;
    if (xhr.readyState == 3){
        //只取得最新数据并调整计数器
        result = xhr.responseText.substring(received);
        received += result.length;
        process(result);
    }else if(xhr.readyState == 4){
        finished(xhr.responseText);
    }
  };
    xhr.send(null);
    return xhr;
}

var  client = createStreamingClient("stremUrl",function (data) {
    alert("Received:"+data);
},function (data) {
    alert("Done!");
});


































