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
*/

var trueVar = 1;//声明一个不可删除的全局变量
fakeVar = 2;//创键全局对象的一个可删除属性
this.fakeVar = 3;//同上
console.log(delete trueVar);
console.log(delete fakeVar);
console.log(delete this.fakeVar);









