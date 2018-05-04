
//安全的类型检测

//检测是不是数组
function isArray(value) {
    return object.prototype.toString.call(value) == "[object Array]";
}

function isFunction(value) {
    return object.prototype.toString.call(value) == "[object Function]";
}


//作用域安全的构造函数
function Person(name,age,job) {
    if (this instanceof  Person){
        this.name = name;
        this.age = age;
        this.job = job;
    }else {
        return new Person(name,age,job);
    }
}

//这段代码为person构造函数添加了一个检查并确保this对象是person实例的if语句，它表示要么使用new操作符，要么在现有的person实例环境下调用构造函数
//这样就避免 person构造函数忽略new时当作普通函数调用时，this映射到Windows对象上，导致错误对象属性的意外增加

//自己实现bind方法
function bind(fn, context) {
    return function () {
        return fn.apply(context,arguments);
    }
}


