a = [1,2,3,4,5];
a.length = 3;
//当length小于数组个数时会导致多余的元素删除
console.log(a);//[ 1, 2, 3 ]


//可以限定数组的length属性变为只读
Object.defineProperty(a,"length",{writable:false});
//这句话不起作用了，length属性为只读了
a.length=0;

console.log(a);//[ 1, 2, 3 ]
//类似的，如果额昂一个数组元素不能配置，就不能删除它了


//数组元素添加和删除
a = [];
a[0] = "zero";
a[1] = "one";
console.log(a);

//可以使用push方法在数组末尾加一个或多个元素
a.push("one");
console.log(a);

//可以像删除对象属性一样使用delete运算符来删除数组元素
delete a[1];
console.log(1 in a );//false
console.log(a.length);//3

//删除数组元素与其赋undefined值是类似的（但有一些微妙的区别）
//对数组元素使用delete不会修改数组的length属性，也不会将元素从高索引处移下来填充已删除属性留下的空白
//如果从数组中删除一个元素，它就变成稀疏数组了


//数组遍历
var keys = Object.keys(a)
console.log(keys);
var values = [];//在数组中存储匹配属性的值
for (var i = 0; i < keys.length; i++) {
	var key = keys[i];
	values[i] = a[key];//在values数组中保存属性值
}

console.log(values);

//在嵌套循环或其他性能非常重要的上下文中，可以看到这总基本的数组遍历需要优化，数组的长度应该只查询一次而非每次蓄奴换都要查询

for (var i = 0,len = keys.length; i < len; i++) {
	//循环体仍然不变
	//检测是否是合法的数据，排除null，undefined和不存在的元素
	if (!a[i]) continue;//跳过null，undefined，和不存在的元素
	
	if (a[i] === undefined ) continue;//跳过undefined和不存在的元素
	
	if (!(i in a)) continue;//跳过不存在的元素
}

//还可以使用forin循环处理稀疏数组，循环每次将一个可枚举的属性名（包括数组索引）赋值给循环变量，不存在的索引将不会遍历到

for(var index in a){

	var value = a[index];
}

//由于forin循环能够枚举继承的属性名，如果添加到Array.prototype的方法，由于这个原因，在数组上不应该使用forin循环，除非使用
//额外的方法来过滤不想要的属性

for(var i in a){
	if (!a.hasOwnProperty(i)) continue;//跳过继承的属性
}

for(var i in a){
	if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;
}

//forin循环以不同的顺序遍历对象的属性，通常数组元素的遍历实现是升序的，但不能保证一定是这样的
//特别地如果数组同时拥有对象属性和数组元素，返回的属性名很可能是按照创建的顺序非数值的大小顺序
//如何处理这个问题的实现各不相同，如果算法依赖于遍历的顺序，那么最好不要使用forin循环，使用常规的for循环

//遍历数组元素的新方法，按照索引的顺序按个传递给定义的一个函数，这些方法中最常见的就是foreach方法

var data = [1,2,3,4,5];
var sumOfSquares = 0;//要得到数据平方和
data.forEach(function(x){
	sumOfSquares += x*x;//平方相加
});
console.log(sumOfSquares);// 55 1 + 4 + 9 + 16 + 25

//foreach 和相关的遍历方法使得数组拥有简单而强大的函数式编程风格

//多维数组 js不支持多维数组，但可以用数组的数组来近似

//一个具体例子，使用二维数组模拟一个九九乘法表
var table = new Array(10);
for (var i = 0; i < table.length; i++) {
	table[i] = new Array(10);
}
for (var row = 0; row < table.length; row++) {
	for (var col = 0; col < table[row].length; col++) {
		table[row][col] = row * col;
	}
}
//使用多维数组来计算
var product = table[5][7];
console.log(product);

//数组方法

var data = [1,2,3,4,5,6];
var sum = 0;
data.forEach(function(value){
	sum += value;
});
console.log(sum);
data.forEach(function(v,i,a){
	a[i] = v + 1;
});
console.log(data);//[ 2, 3, 4, 5, 6, 7 ]

//注意使用forEach无法启动后暂停，像for循环那样使用break语句等
//如果要提前终止必须把foeeach方法放在try块中，并能抛出一个异常
function foreach(a,f,t){

	try {
		a.forEach(f,t);
	}catch(e){
		if (e===foreach.break) {return;}
		else throw e;
	}
}

foreach.break = new Error("StopIteration");

//map()函数
b = data.map(function(x){return x * x;})
console.log(b);//[ 4, 9, 16, 25, 36, 49 ]


//filter()函数

smallValue = data.filter(function(x){ return x < 3;})
console.log(smallValue);
everyother = data.filter(function(x,i){ return i % 2 == 0;})
console.log(everyother);//[ 2, 4, 6 ]

//filter会跳过稀疏数组中缺少的元素，它的返回数总是稠密的，为了压缩稀疏数组的空缺
var sparse = [1,,,null,3,undefined,,4,5,6];
var dense = sparse.filter(function(){return true;})
console.log(dense); //[ 1, null, 3, undefined, 4, 5, 6 ]

//甚至压缩空缺并删除undefined和null元素
var densest = sparse.filter(function(x){return x !== undefined && x != null;});
console.log(densest);

//every() 针对全部为真 返回true 和 some() 针对部分为真 就返回true

a = [1,2,3,4,5];
b1 = a.every(function(x) {return x < 10;}); //true
b2 = a.every(function(x) {return x % 2 == 0;});//false
console.log(b1,b2);

b3 = a.some(function(x) {return x % 2 == 0;});//true
b4 = a.some(isNaN);//false 不包含非数值元素
console.log(b3,b4);

//注意 every和some 一旦确认返回什么值它们就会停止遍历数组元素 every确定false  some 确定true

//reduce() 和 reduceRight() 制定函数将数组元素进行组合生成单个值，注入和折叠
var a = [1,2,3,4,5,6,7,8,9];
var sum = a.reduce(function(x,y){return x + y;},0);//数组求和
var product = a.reduce(function(x,y){return x*y;},1);//数组求积
var max = a.reduce(function(x,y){return (x>y) ? x : y;});//求最大值
console.log(sum,product,max);




































































