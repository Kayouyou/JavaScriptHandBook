//使用生成器函数
function* WeaponGenerator() {
    yield 'qiang';
    yield 'pao';
    yield 'dao';
}

for (let weapon of WeaponGenerator()){
    console.log(weapon);
}


//通过迭代器控制生成器
//调用生成器后就会创建一个迭代器
const weaponIterator = WeaponGenerator();

//迭代器想生成器请求一个值，从而控制生成器
const result2 = weaponIterator.next();

//每当生成一个值后，生成器就会非阻塞挂起执行，随后耐心等待下一次请求的到达
//返回的是一个对象，value是值，done是bool类型，表明之后还有值生成
//当最后没有可供执行的代码了，生成器返回一个对象，属性value值被设置为undefined 属性done被设置为true，表明它工作已经完成了

//使用while循环迭代生成器结果
while (!(item = weaponIterator.next()).done){
    console.log(item.value);
}

//把执行权交给下一个生成器
function* WarriorGenerator () {
    yield "Suzu";
    yield* NinjanGenerator();//yiled* 将执行权交给另一个生成器
    yield "Khan";
}

function* NinjanGenerator() {
    yield "Hattori";
    yield "Yoshi";
}

//在迭代器上使用yield*操作符 程序会跳到另外一个生成器上执行，
for (let warrior of WarriorGenerator()){
    console.log(warrior)
}


//使用生成器 生成ID序列
//创建某些对象时，我们经常需要为一个对象赋值一个唯一的ID，常规写法很丑陋，全局计数，但是使用生成器就高级一些

function* idGenerator() {//定义生成器函数
    let id = 0; //一个始终记录ID的变量 这个变量无法在生成器外面改变
    while (true){
        yield ++id;
    }//循环无限长度的ID序列
}

//准备一个迭代器 用于向生成器请求新的ID值
const  iditerator = idGenerator();

const ninja1 = {id:iditerator.next().value};
const ninja2 = {id:iditerator.next().value};
const ninja3 = {id:iditerator.next().value};

console.log(ninja1.id,ninja2.id,ninja3.id);// 1 2 3

//好处很明显：局部变量ID 仅仅能在改生成器中访问，不用担心有人会不小心在其他地方修改ID的值，随后是一个无限循环，每次都能生成一个新ID值并挂起执行，直到下一次ID请求到达


//与生成器交互
//1， 作为生成器函数参数发送值

function* TimGenerator(action) {//生成器函数可以像其他函数一样接收标准参数

    const imposer = yield ('kayou' + action);
    yield ('yoshi (' + imposer +'）'+action );
}

const inijan = TimGenerator('skill');
const result11 = inijan.next();
console.log(result11.value);

//将数据作为next方法的参数传递给生成器
const  result22 = inijan.next('kill');
console.log(result22.value);


//抛出异常

function* exceptionGenerator () {

    try {
        yield "hello";

    }catch(e){
        console.log(e)
    }
}

const excepG = exceptionGenerator();
const rr1 = excepG.next();
console.log(rr1.value);
excepG.throw('catch this');//向生成器抛出一个异常























































































