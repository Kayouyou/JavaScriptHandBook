//声明一个变量
var scope = "global";

function checkScope(){
	var scope = "local";
	return scope;
}

console.log(checkScope()) // => local

//尽管全局作用域内编写代码可以不写var语句，但声明局部变量时则必须使用var语句

//函数定义是可以嵌套的，由于每个函数都有它的作用域，因此会出现几个局部作用域嵌套的情况


var scope = "global";//全局变量

function checkScope(){
	var scope = "local";//局部变量
	function nested(){
		var scope = "nested scope"
		return scope;
	}
	return nested();
}

console.log(checkScope()) //=》 nested scop


function test(o){
	var i = 0;//整个函数体内部都是定义的
	if (o == "object") {
		var j = 0;
		for (var k = 0; k < 10; k++) {
			console.log(k);
		}
		console.log(k)
	}
	console.log(j)
}

oo = new String();
oo = "object";
test(oo)
console.log(oo)


var scope = "global";
function f(){
	console.log(scope);//输出undefined 不是global
	var scope = "loacl";
	console.log(scope);//输出local
}

f()

//改进上面f(）
function advanceF(){
	var scope;
	console.log(scope);
	scope = "local inner scope";
	console.log(scope);
}

advanceF()

/*
作为属性的变量
当声明一个js全局变量时，实际上是定义了全局对象的一个属性，当使用var声明一个变量时
创建的这个属性是不可配置的，也就是说这个变量无法通过delete运算符删除

如果你没有使用严格模式并给一个未声明的变量赋值的话，JS会自动创建一全局变量
以这种方式创建的变量时全局对象的正常的可配置属性，并可以删除它们

*/

var trueVar = 1;//声明一个不可删除的全局变量
fakeVar = 2;//创键全局对象的一个可删除属性
this.fakeVar = 3;//同上  JS允许使用this关键字引用全局对象
console.log(delete trueVar);//false
console.log(delete fakeVar);//ture
console.log(delete this.fakeVar);//ture









