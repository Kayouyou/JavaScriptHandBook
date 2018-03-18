
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
console.log(res[0]())
console.log(res[1]());
console.log(res[2]())
































