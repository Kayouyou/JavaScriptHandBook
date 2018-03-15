//面向对象设计

//构造函数的问题
function Person(name,age,job){
this.name = name;
this.age  = age;
this.job  = job;
this.sayName = new Function("console.log(this.name)");
}

var p1 = new Person('jim',29,'software engineer');
var p2 = new Person('mark',27,'teacher');

//构造函数始终都应该以一个大写的字母开头，而非构造函数则应该以一个小写的字母开头；

// alert(p1.constructor == Person);//true
// alert(p2.constructor == Person);//true

//检测对象类型还是instanceof靠谱一点
console.log(p1 instanceof Object);//true
console.log(p1 instanceof Person);//true

//当构造函数使用
var person = new Person('ruby',30,'CTO');
person.sayName()


//作为普通函数调用
Person('jim',24,'Doctor');//添加到window上
// window.sayName();
//当在全局作用域中调用一个函数时，this对象总是指向Global对象，在浏览器中就是window对象


//在另个一对象的作用域中调用
var o = new Object();
Person.call(o,'kayouyou',27,'engineer');
o.sayName();

//以上构造函数的缺点就是每个方法都要在每个实例上重新创建一遍，根本不用在执行代码前就把函数绑定到特定的对象上面
//因此通过把函数定义转移到构造函数外部来解决这个问题

function People(name,age,job){
this.name = name;
this.age  = age;
this.job  = job;
this.sayName = sayName;
}

function sayName(){
console.log(this.name);
}

//上面的例子我们把sayName函数转移到构造函数外面，这样一来sayname包含的是一个指向函数的指针，因为 p1p2对象就共享了子啊全局作用域定义的同一个syaname函数
//但是新的问题也来了，在全局作用域定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实
//更让人无法接受的是：如果对象需要定义很多方法，那么就要定义很多个全局函数，那我们自定义的类型就丝毫没有封装性可言了

//原型模式 解决
//我们创建的每个函数都有一个prototype原型属性，这个属性是一个指针，指向一个对象
//而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
//使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法，换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中

function PeopleNew(){}

PeopleNew.prototype.name = 'ka shang';
PeopleNew.prototype.age  = 29;
PeopleNew.prototype.job  = 'software engineer';
PeopleNew.prototype.sayName = function(){
console.log(this.name);
}

var pp = new PeopleNew();
pp.sayName();

//要理解原型模式的工作原理，必须先理解原型对象的性质
//理解原型对象
//无论什么时候，只要创建一个新的函数，就会根据一组特定的规则为该函数创建一个prototype属性
//这个属性指向函数的原型对象，在默认情况下 所有原型对象都会自动获得一个constructor属性
//

//组合使用构造函数模式和原型模式
//构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性
function Person1(name,age,job){
this.name = name;
this.age  = age;
this.job  = job;
this.friends = ['jim','mark'];
}
Person1.prototype = {
constructor : Person1,
sayName : function(){
console.log(this.name);
}
}

var pp = new Person1('kayou',27,'engineer');
pp.sayName();

//结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法引用，最大限度的节省内存
//以上组合模式是目前使用最广泛的认同度最高的方法

//动态原型模式
//把所有的信息都封装在构造函数中，而通过在构造函数中初始化原型（仅仅在必要情况下），又保持了同时使用构造函数和原型的优点
function Person2(name,age,job){
//属性
this.name = name;
this.age  = age;
this.job  = job;
//方法
if (typeof this.sayName != 'function') {
	Person2.prototype.sayName = function(){
		console.log(this.name);
	};
}
}
var pp = new Person2('kayou',27,'engineer');
pp.sayName()
//这里只在sayname不存在的情况下才会将它添加到原型中，这段代码在初次调用构造函数时才会执行，此后原型应完成初始化，不需要再做什么修改了
//使用动态原型模式时，不能使用对象字面量重写原型，前面已经解释过了，如果已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系


//寄生构造函数模式，在前面几种模式都不适用的情况下，可以使用寄生parastic构造函数模式

//稳妥构造函数模式，所谓的稳妥对象，指的是没有公共属性，而且其方法也不引用this对象，稳妥对象最适合一些安全环境中（这些环境会禁用this和new）

function Person3(name,age,job){
//创建要返回的对象
var o = new Object();
o.sayName = function(){
	console.log(name);
};
return o;
}

//注意：第一，新创建的对象的实例不引用this，第二，不能使用new操作符调用构造函数
//这种稳妥模式下，除了sayname方法之外，没有其他办法访问name的值，

var friend = Person3('lucy',21,'cooker');
friend.sayName();






























































