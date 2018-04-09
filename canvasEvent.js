//要在画布上绘制图形，需要取得绘图上下文
var drawing = document.getElementById("drawing");
//使用canvas之前先检查getContext方法是否存在；
if (drawing.getContext){
    //2D 上下文
    var context = drawing.getContext("2d");

    //取得图像的数据URL，可以导出在canvas上绘制的图像
    var imgUrl = drawing.toDataURL("image/png");
    //显示图像
    var image = document.createElement("img");
    image.src = imgUrl;
    document.body.appendChild(image);

    //填充和描边
    context.strokeStyle = "red";
    context.fillStyle   = "#57FF44";

    //绘制矩形  矩形是唯一可以直接在2D上下文中绘制的形状
    context.fillRect(10,10,50,50);
    context.strokeRect(10,10,50,50);

    //清除一个小矩形
    context.clearRect(40,40,10,10);

}

//绘制一个不带数字的时钟表盘
var  drawing = document.getElementById("drawing");
//确定浏览器支持canvas
if (drawing.getContext){
    var  context = drawing.getContext("2d");
    //开始路径
    context.beginPath();
    //绘制外圆
    context.arc(100,100,99,0,2*Math.PI,false);
    //绘制内圆
    context.moveTo(194,100);
    context.arc(100,100,94,0,2*Math.PI,false);
    //绘制分针
    context.moveTo(100,100);
    context.lineTo(100,15);
    //绘制时针
    context.moveTo(100,100);
    context.lineTo(35,100);
    //描边路径
    context.stroke();

    //绘制文本
    context.font = "bold 14px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("12",100,20);

    //measureText方法利用font textAlign textBaseline计算制定文本的宽度
    var  fontsize = 100;
    context.font = fontsize + "px Arial";
    while(context.measureText("hello world").width > 140){
        fontsize --;
        context.font = fontsize + "px Arial";
    }
    context.fillText("hello world",10,10);
    context.fillText("font size is " + fontsize + "px",10,50);

    //渐变色
    var gradient = context.createLinearGradient(30,30,70,70);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(1,"black");

    if (context.isPointInPath(100,100)){
        alert("Point(100,100) is in the path");
    }
}




















