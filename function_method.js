
function getSex() {
    return 'female';
}


//在一个对象绑定方法，称为这个对象的方法
var xiaoye = {
    name:'kayouyou',
    birth:1990,
    age:function () {
    //在方法的一开始就捕获this
        var that = this;
        function getAgeFromBirth() {
            var  y = new  Date().getFullYear();
            return y - that.birth;
        }
        return getAgeFromBirth();
    },
    sex:getSex
};

xiaoye.age;
console.log(xiaoye.age());

//要保证this指向正确，必须用obj.xxx()的形式调用！
var getAge = xiaoye.age;
console.log(getAge());//NaN


//apply 可以指定函数的this指向哪个对象,2个参数：需要绑定的this变量，array表示函数本身的参数

console.log(xiaoye.sex());//female
console.log(getSex.apply(xiaoye,[]));//female

//apply类似方法是call，唯一区别是：apply把参数打包成array在传入，call把参数按顺序传入
//比如调用Math.max(3,5,4)
//对于普通的函数，我们通常把this绑定为null
Math.max.apply(null,[3,5,4]);
Math.max.call(null,3,5,4);


//装饰器 利用apply可以改变函数的行为，js中的所有的对象都是动态的，及时内置的函数，我们也可以重新指向新的函数
//假设我们想统计一下代码一共调用了多少次parseint

// var count = 0;
// var oldParseInt = parseInt;//保存原先内置函数
//
// window.parseInt = function () {
//     count += 1;
//     return oldParseInt.apply(null,arguments);//调用原函数
// }


//函数作为返回值

function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x,y) {
           return x + y;
        });
    }
    return sum;
}

//闭包
function count() {
    var  arr = [];
    for (var i = 1;i<=3;i++){
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
var  results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
console.log(f1(),f2(),f3());//16 16 16

//以上结果都是16   原因在于返回的函数引用了变量i，但它并不是立即执行的，等3个函数都返回时
//它们所引用的变量i都变为了4   最终结果就是16了
//返回闭包注意：返回函数不要引用任何循环变量，或者后续会发生变化的变量
//如果一定要引用循环变量怎么办呢？ 方法是在创建一个函数，用函数的参数绑定循环变量当前的值，如论循环变量怎么更改，绑定的值也不会变了

//修改后版本
function count() {
    var  arr = [];
    for (var i = 1;i<=3;i++){
        arr.push((function () {
            return function (n) {
                return n * n;
            }
        })(i));
    }
    return arr;
}
//上面用到了一个 创建一个匿名函数并立即执行的语法

//箭头函数 与 匿名函数的区别就是 箭头函数内部的this是词法作用域，由上下文确定。

var obj = {
    birth:1990,
    getAge:function () {
        var b = this.birth;
        var fn = function () {
            return new  Date().getFullYear() - this.birth;//this指向window或undefined
        };
        return fn();
    }
};

console.log(obj.getAge());//NaN


var obj2 = {
    birth:1990,
    getAge:function () {
        var b = this.birth;
        var fn = ()=> new  Date().getFullYear() - this.birth;//this指向window或undefine
        return fn();
    }
};
console.log(obj2.getAge());//28


//promise

function log(s) {
    console.log(s);
}

new Promise(function (resolve,reject) {
    log('start new promise...');
    var timeout = Math.random() * 2;
    log('set timeout to:' + timeout +'seconds' );
    setTimeout(function () {

        if (timeout < 1){
            log('call reslove()');
            resolve('200 ok');
        }else {
            log('call reject()');
            reject('timeout in: ' + timeout + 'seconds');
        }
    },timeout * 1000);
}).then(function (r) {
    log('Done:'+r);
}).catch(function (e) {
   log('failed:' + e);
});

//可见promise最大的好处就是异步执行的流程中，把执行代码和处理结果的代码清晰的区分开了































