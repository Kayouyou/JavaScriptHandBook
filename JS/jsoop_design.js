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
friend.sayName();//lucy

//继承 
//确定原型和实例的关系有两种方式
//instanceof  isPrototypeOf 都可以使用
//谨慎定义方法

function SuperType(){
this.property = true;
}
SuperType.prototype.getSuperValue = function(){
return this.property;
}
function SubType(){
this.subproperty = false;
}
//继承，必须在supertype的实例替换原型之后，在定义这两个方法
SubType.property = new SuperType();
//添加新方法
SubType.prototype.getSubValue = function(){
return this.subproperty;
}
//重写超类中的方法，会屏蔽原来的那个方法
SubType.prototype.getSuperValue = function(){
return false;
}

var instance = new SubType();
console.log(instance.getSuperValue());//false

//还有一个注意点：通过原型链实现继承时，不能使用对象字面量创建原型方法，因为这一做就会重写原型链


function SuperType1(){
this.property = true;
}
SuperType1.prototype.getSuperValue = function(){
return this.property;
}
function SubType1(){
this.subproperty = false;
}

//继承
SubType1.prototype = new SuperType1();
//使用字面量添加新方法，会导致上一行代码无效
SubType1.prototype = {
getSubValue : function(){
return this.subproperty;
},
someOtherMethod : function(){
return false;
}
}

var insatance = new SubType1();
console.log(instance.getSuperValue());

//原型链的问题
//包含引用类型值的原型属性会被所有的实例共享
function SuperTypeC(){
	this.colors = ['red','white','black','purple'];
}
function SubTypeC(){};
//继承
SubTypeC.prototype = new SuperTypeC();

var ins = new SubTypeC();
ins.colors.push('blue');
console.log(ins.colors);
var ins2 = new SubTypeC();
console.log(ins2.colors);
// [ 'red', 'white', 'black', 'purple', 'blue' ]

//问题2  在创建子类型的实例时，不能向超类型的构建函数中传递参数；
//实际上，说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数
//综合以上，实践中很少会单独使用原型链

//借用构造函数 用于解决原型中包含引用类型值所带来问题的过程
//这种技术思想很简单，即在子类型构造函数的内部调用超类型构造函数
//函数不过是特定环境下执行代码的对象，因此通过使用apply和call方法可以在新创建的对象上执行构造函数
function SuperTypeA(){
	this.colors = ['red','white','black','purple'];
}
function SubTypeA(){
	//继承
	SuperTypeA.call(this);
    //借调了超类的构造函数，通过使用call或apply实际是在将要新创建的subtype实例的
    //环境下调用了supertype构造函数，这样一来就会在新subtype对象上执行supertype函数定义的所有对象的初始化diamante
    //结果是 subtype的每个实例都会具有自己的colors属性的副本了

};

var ins = new SubTypeA();
ins.colors.push('blue');
console.log(ins.colors);
var ins2 = new SubTypeA();
console.log(ins2.colors);

// [ 'red', 'white', 'black', 'purple', 'blue' ]
// [ 'red', 'white', 'black', 'purple' ]

//借用构造函数特点一  传递参数

//组合继承 也称之伪经典继承 指的是将原型链和借用构造函数的技术组合一起 从而发挥二者之长的一种继承模式
//背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承
//这样 通过在原型上定义方法实现了函数复用，又能保证每个实例都有它的属性

function SuperType(name){
this.name = name;
this.colors = ['red','blue','green'];
}

SuperType.prototype.sayName = function(){
	console.log(this.name);
}

function SubType(name,age){
	//继承属性
	SuperType.call(this,name);
	this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function(){
	console.log(this.age);	
}

var instance1 = new SubType('jake',29);
instance1.colors.push('purple');
instance1.sayAge();
instance1.sayName();
console.log(instance1.colors);

var insatcne2 = new SubType('lily',25);
console.log(insatcne2.colors);
insatcne2.sayName();
insatcne2.sayAge();

//组合继承避免了原型链和借用构造函数的缺陷，融合了他们的优点，成为最常用的继承模式
//而且 instanceof和isPrototypeOf也能用于识别基于组合继承创建的对象

//组合继承也有缺点，无论什么情况下，都会调用两次超类型构造函数
//一次是创建子类型原型的时候
//另一次是在子类型构造函数内部
//所谓寄生组合继承，通过借用构造函数来继承属性，通过原型链的混成形式来继承方法

//寄生组合继承基本模式如下
function inheritPrototype(sub,super){
//接收两个参数：子类型构造函数和超类型构造函数
//1,创建超类型原型的一个副本
var prototype = Object(super.prototype);
//2,为创建的副本添加constructor属性，从而弥补因重写原型而失去的默认的constructor属性
prototype.constructor = sub;
//3,将新创建的属性（副本）赋值给子类型的原型
sub.prototype = prototype;
}

inheritPrototype(SubType,SuperType);

//寄生组合继承是引用类型最理想的继承范式





































































































































