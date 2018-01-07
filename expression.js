/**

第四章 表达式和运算符

*/


/*  4.1 原始表达式：常量，直接量，关键字，变量  */

//4.1.1数字直接量
1.23

//字符串直接量
"hello"

//4.1.2 JS中的一些保留字构成了原始表达式
true
false
null
this 

//4.1.3 变量
// i//变量值
undefined//全局变量，和null不同，它不是一个关键字


/*  4.2 对象和数组的初始化表达式  */

//4.2.1 数组初始化表达式
// [];
a = [1+2,3+4];
//空置的元素会填充为undefined
var sparseArray = [1,,,,5];

//4.2.1 对象初始化表达式
var p = {x:2.3,y:-1.2};//一个拥有两个属性成员的对象
var q = {};//一个空对象
q.x = 2.3;q.y = -1.2;


/* 4.3 函数定义表达式 */
var suqare = function(x){return x*x;}


/* 4.4 属性访问表达式 */

var o = {x:1,y:{z:3}}; //师例对象
var a = [o,4,[5,6]];   //一个包含这个对象的示例数组

console.log(o.x);
console.log(a[1]);
console.log(a[4]);//undefined

/* 4.5 调用表达式 ：一种调用或执行函数或方法的语法表示。*/

mm = Math.max(12,10,18);
console.log(mm);


/* 4.6  对象创建表达式 */

//如果一个对象创建表达式不需要传入任何参数给构造函数的话，那么这对空圆括号可以省略掉

now = new Date;
console.log(now);
/* 4.7  运算符概述 */

// 4.7.1 操作数的个数  ** 乘法运算符  - 负数运算符 ？ ： 三元运算符

// in 运算符
var point = {x:1,y:1};//定义一个对象
b = "x"in point;
bb = "toString"in point;
console.log(b,bb);

var data = [7,8,9]; //包含三个元素的数组
console.log("0" in data);
console.log(1 in data);
console.log(8 in data);//满意索引为8 的元素


//instanceof
var d = new Date();
ddd = d instanceof Date;
ddd instanceof Object;//true
ddd instanceof Number;//false
console.log(ddd);//true

var a = [1,2,3];
a instanceof Array;//true
a instanceof Object;//true
a instanceof RegExp;//false

/* 4.12 表达式计算  和其他很多解释性语言一样，JS同样可以解释解释源代码组成的字符串，并产生一个值
   JS通过全局函数eval()来完成这个工作
*/


res = eval("3+2");
console.log(res); // 5 




var geval = eval;//使用别名调eval 将是全局eval
var x = "global";
var y = "global";//两个全局变量
function f(){//函数内执行的是局部eval
	var x = "local";//定义局部变量
	geval("x+='changed';");//直接eval更改局部变量值
	return x;
}

function g(){//函数内执行全局eval

	var y = "local";
	geval("y+='changed';");//间接调用改变全局变量值
	return y;
}

console.log(f(),x);
console.log(g(),y);













































