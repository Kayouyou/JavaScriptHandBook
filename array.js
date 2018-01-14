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
console.log(sumOfSquares);
































