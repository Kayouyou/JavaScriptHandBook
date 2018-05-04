
var a = [1,2,3,4,5,6];
for (var x of a){
    console.log(x);
}

//for of  与   for  in区别
a.name = "Ka";
//不会打印name
for (var x of a){
    console.log(x);
}

//会打印数name
for (var x in a){
    console.log(x);
}

//区别：forin 实际遍历的是对象的属性名，forof只循环自身的元素

//更好的方法是foreach方法
a.forEach(function (element, index, array) {
    console.log(element + ', index = ' + index);
});

//上面调用函数的参数可以省略，根据你的需要只写element元素即可







