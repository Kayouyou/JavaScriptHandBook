
// 7章  函数表达式
//函数表达式两种
//1,函数声明，它的重要特征就是函数声明提升，意思是执行代码之前会先读取函数声明，这意味着可以把函数声明放在调用它的语句后面

//2，函数表达式，也叫匿名函数，它和其他的表达式一样，在使用前必须先赋值


//7.1 递归
//一个经典的递归阶乘函数
function factorial(num){
if (num <= 1) {
	return 1;
}else{
	return num * factorial(num - 1);
}
}

var anotherFactorial = factorial;
// factorial = null;
console.log(anotherFactorial(4));

//上面代码会报错，指向原始函数的引用只剩下一个，但是接下来调用anotherFactorial 时由于必须执行factorial
//而factorial不再是函数，所有会报错！

//这种情况下可以用 arguments.callee解决，它是一个指向正在执行的函数的指针

function factorial(num){
if (num <= 1) {
	return 1;
}else{
	return num * arguments.callee(num - 1);
}
}

var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));
//可以确保使用arguments.callee 代替函数名，可以确保无论怎样调用函数都不会出问题
//但是在严格模式下，不能通过脚本访问arguements。callee访问这个属性会导致错误

//不过可以使用函数命名表达式来达成相同的结果

var factorial = (function f(num){
if (num <= 1) {
	return 1;
}else{
	return num * f(num - 1);
}	
})
var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));

//以上代码创建一个名为f()的命名函数表达式，然后将它赋值给变量factorial
//即便把函数赋值给另一个变量，函数的名字f仍然有效，所有递归调用照样正确完成
//这种方式在严格模式和非严格模式下都行得通！


//7.2 闭包 
//闭包：指有权访问另一个函数作用域中的变量的函数
/*
  当某个函数第一次被调用时，会创建一个执行环境及相应的作用域链，并把作用域链赋值给一个特殊的内部属性；
  即是scope，然后使用this，arguements和其他命名参数的值来初始化函数的活动对象
  但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位
  直至作为作用域链终点的全局执行环境；

  在内部匿名函数从外部函数中被返回后，它的作用域被初始化为包含外部函数的活动对象和全局变量对象
  这样匿名函数就可以访问外部函数定义的所有变量，更为重要的是外部函数在执行完毕会后其活动对象不会被销毁
  因为匿名函数的作用域链仍然引用这个活动对象；换句话时候当外部函数返回后，其执行环节的作用域链会被销毁
  但它的活动对象仍然会留在内存中，直到匿名函数被销毁
 
  由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存空间，过度使用闭包可能会导致内存占用过多
  建议绝对必要时才考虑使用闭包！
*/

//7.2.1 闭包与变量

//由于作用域链的这种配置机制引出了一个值得注意的副作用；即是闭包只能取得包含函数中的任何变量的最后一个值
//闭包所保存的是整个变量对象，而不是某个特殊的变量

function createFunctions(){
var result = new Array();
for (var i = 0; i < 10; i++) {
result[i] = function(){
return i;
};
}
return result;
}
var res = createFunctions();
console.log(res[1]());//结果每个都是10 
//原因是：每个函数的作用域链都保存着createFunctions函数的活动对象
//所以它们引用的都是同一个变量i，当函数返回后，变量I的值是10，此时
//每个函数都引用着保存变量IDE同一个变量对象，所以每个函数内部i的值都是10

function createFunctions2(){
var result = new Array();
for (var i = 0; i < 10; i++) {
result[i] = function(num){
return function(){
return num;
};
}(i);
}
return result;
}

var res = createFunctions2();
console.log(res[0]());//0
console.log(res[1]());//1
console.log(res[2]());//2

//重写前面的创建函数后，每个函数都会返回各自的不同的索引了
//这个版本中我们没有直接把闭包赋值给数组，而是定义了一个匿名函数
//并将立即执行该函数的结果赋值给数组，这里的匿名函数有一个参数num
//也就是最终的函数要返回的值，在调用每个匿名函数时，我们传入变量i
//由于函数参数按值传递的，所以就会将变量i的当前值赋值给参数num
//这个匿名函数内部又创建并返回一个访问num的闭包，这样result数组中的每个函数
//都有自己num变量的一个副本，因此就可以返回各自不同的数值了

//7.2.2 关于this对象
/*
在全局函数中，this等于window，而函数被作为某个对象的方法调用时，this等于那个对象
不过，匿名函数的执行环境具有全局性，因此this对象通常指向window
*/

var name = " Window";
var object = {
name : "My object",
getNameFunc : function(){
return function(){
return this.name;
};
}
};

//在非严格模式下才会打印 window
console.log(object.getNameFunc()());//打印undifine

//为什么没有取得其包含作用域的this对象呢？
/*
每个函数被调用时，其活动对象都会自动取得两个特殊变量：this和arguments
内部函数在搜索这两个变量时，只会搜索到其活动对象为止，隐藏永远不可能直接访问
外部函数中的这两个变量，不过把外部作用域中的this对象保存在一个闭包能够访问到的变量里

*/

var name = " Window";
var object = {
name : "My object",
getNameFunc : function(){
//在定义匿名函数之前，我们把this对象赋值给一个名叫that的变量
//在定义闭包之后，闭包可以访问这个变量，因为它是我们包含函数中
//特意声明的一个变量，即使在函数返回之后，that也仍然引用着object
//所以调用object的getNameFun()就返回了my object
var that = this;
return function(){
return that.name;
};
}
};

console.log(object.getNameFunc()());//打印My object

//在几种特殊情况下this的值可能会发生变化

var name = " Window";
var object = {
name : "My object",
getName : function(){
return this.name;
}
};


console.log(object.getName());//打印My object
console.log((object.getName)());//打印My object

//先执行了一条赋值语句，然后在调用赋值后的结果，因为这个赋值表达式的值是函数
//本身，所以this的值能得到维持，结果就是window
//非严格模式下  window
console.log((object.getName = object.getName)());//打印undefined


//7.2.3 内存泄漏











































