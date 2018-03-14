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


















































