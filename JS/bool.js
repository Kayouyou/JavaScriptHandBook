//布尔值
a = 1;
console.log(a==4)
b = 0;
if (a == 4) {
	b = b + 1;
}else{
	a = a + 1;
}

console.log(b)

undefined
null
-0
NaN
""
false

//以上六个可以转换为false的值有时被称为假值，falsy value
console.log("".toString())

//null和 undefined
//null时JS的关键字，常用来描述空值，是一个特殊的对象值，含义是非对象，它可以表示数字，字符串 对象是无值得
//JS第二个表示值得空缺，用未定义得值表示更深层次的空值，它是变量的一种取值，表示变量没有初始化
//如果函数没有任何返回值返回undefined则说明这个属性或元素不存在

//undefined和null不一样，它不是关键字，是预定义的全局变量

/*
全局对象，global object 在JS中有很重要的用途；
当JS解释器启动时或web浏览器加载新页面时它将会创建一个新的全局对象
*/

var s = "test";

s.len = 4;

var t = s.len;
//返回的时 undefined，原因是第二行代码会创建一个临时字符串对象，给其属性赋值，随机销毁了
// 字符串不是对象，如果你试图给其属性赋值，会创建临时对象，类似的 数字，布尔值属性值一样

console.log(t)

//这种创建临时对象的行为称为 包装对象
//可以通过String() Number() Boolean()创建包装对象
var s = "test" , n = 1, b = true;
var s = new String(s)
console.log(s)
// [String: 'test']
var n = new Number(n)
console.log(n)
var b = new Boolean(b)
console.log(b)

//JS会在必要的时候讲保证对象转换为原始值，“==”全等运算符和其包装对象视为对等，但是
//“===”全等运算符将他们视为不等，通过typeof可以看到原始值和包装值对象的不同

//JS中原始值 undefined null bool string number 与对象有着根本的区别
//原始值是不可更改的，任何方法都不行

//对象是可变的
var o = {x:1};
o.x = 2;
o.y = 3;
console.log(o)


var a = [2,3];
a[0] = 1;
a[2] = 2;
console.log(a)

//对象比较不是值比较，是引用比较
var a = [];
var b = a;
b[0] = 1;
console.log(a[0])//1
console.log(a===b)//true

//定义一个方法 比较单独的对象或数组
function equalArrays(a,b) {
	if (a.length != b.length) {return false;}
	for (var i = 0; i < a.length;i++) {
		if (a[i]!=b[i]) {return false;}
	}
	return true;
}

a = [1,2,3]
b = [1,2,3]
console.log(equalArrays(a,b))

//类型转换
console.log(10+"objects")
console.log("4"*"19")//76
 var d = new Date(2010,0,1)
 console.log(d.valueOf())

//声明一个全局的变量
var scope = "global";

function checkscope(){
	//声明一个同名的局部变量
	var scope = "local";
	//返回局部变量
	return scope;
}

console.log(checkscope())



















