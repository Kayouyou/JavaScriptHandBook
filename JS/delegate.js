
//  8.2.1  使用代理记录日志

//定义形参为target的函数，并使得target可以记录日志
function makeloggable(target) {
    //针对target对象创建代理
    return new Proxy(target,{
       get:(target,property)=>{
           console.log('reading' + property);
           return target[property];
       },//通过get方法实现属性读取记录日志

       set:(target,property,value)=>{
           console.log('writing value' + value + 'to '+ property);
           target[property] = value;
       },//通过set方法实现属性赋值记录日志
    });
}

let tt = {name:'yoshi'};
tt = makeloggable(tt);

if (tt.name === 'Yoshi'){
    console.log('tt name is not equal Yoshi');
}
tt.name = 'kayouyou';



// 8.2.2 使用代理评估性能

function isPrime(number) {
    if (number < 2){return false;}
    for (let  i = 2; i < number;i ++){
        if (number%i===0){return false;}
    }//定义isprime函数的简单实现
    return true;
}

//使用代理包装isPrime方法
isPrime = new Proxy(isPrime,{
    //定义apply方法，当代理对象作为函数被调用时将会触发apply方法的执行
    apply:(target,thisArg,args)=>{
        //启动一个计时器 记录isPrime函数执行的起始时间
        console.time('isPrime');
        //调用目标函数
        const result = target.apply(thisArg,args);
        //停止计时器的执行并输出结果
        console.timeEnd('isPrime');
        return result;
    }
});


isPrime(12987);



// 8.2.3 使用代理自动填充属性

function Folder() {
    return new Proxy({},{
        get:(target,property)=> {
            //可以在这里记录所有读取对象属性的日志
            console.log('reading' + property);
            if (!(property in target)) {//如果对象不具有该属性，则创建该属性
                target[property] = new Folder();
            }
            return target[property];

        }
    });
}

const rootFolder = new Folder();

try {
    //每当访问属性时，都会执行代理方法，若属性不存在，则创建该属性
    rootFolder.firstDir.secondDir.thirdDir = 'test.txt';
    console.log('an exception was not raised');

    //


}catch(e) {
    fail('an exception has occured');
}


//8.2.4  使用代理实现负数数组索引
// js不支持负索引

function createNegativeArrayProxy(array) {

    if (!Array.isArray(array)){
        //如果传入的参数不是数组，则抛出异常
        throw  new TypeError('excepted an array');
    }

    //返回新的代理，该代理传入的数组作为代理目标
    return new Proxy(array,{
        //当读取数组元素时调用get方法
        get:(target,index)=>{
            //使用一元操作符将属性名变成数值
            index = +index;
            return target[index < 0 ? target.length + index:index];
        },
        //当写入数组元素时，调用set方法
        set:(target,index,val)=>{
            index = +index;
            return target[index < 0? target.length + index:index] = val;

        }
    });
}

//创建标准数组
const tempArr = ['yoshi','kuma','hattor'];
const proxyTemArr = createNegativeArrayProxy(tempArr);

proxyTemArr[-1] = "yeyangyang";
console.log(proxyTemArr[-2]);

//代理可以自动填充属性，使用负索引，但是它有缺点，就是性能问题
//代理建议在多性能不敏感的程序里使用代理，但是若多次执行代码仍然要小心谨慎












































