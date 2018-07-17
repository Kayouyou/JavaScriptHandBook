
// 9.1.1 创建数组

//使用字面量构建数组
const arr1 = ['ye','yang','yang'];
//使用构造函数构建数组
const arr2 = new  Array('mark','jim');

//使用字面量创建数组优于数组构造函数
//1，简洁
//2,由于js高度动态性，无法阻止修改内置array构造函数



// 9.1.2  删除 添加
const names = [];
names.push('lily');//在数组末尾添加元素
names.push('lucy');
console.log(names[1]);
names.unshift('lily');//在数组开头添加元素
console.log(names.length);

names.pop('lucy');//在数组末尾删除元素
names.shift('lily');//在数组开头删除元素
console.log(names[0]);
console.log(names.length);

//pop和push只影响最后一个元素，shift和unshift修改第一个元素，之后每个元素的索引都要调整，因此pop push方法比后两者要快很多，非特殊情况不建议使用shift和unshift


// 9.1.3 在数组任意位置添加或删除

const ttt = ['2','1','3','7'];

//splice 删除制定位置的元素
var removedItems = ttt.splice(1,1);
console.log(removedItems);
console.log(ttt);


//splice 添加元素
removedItems = ttt.splice(1,2,'111','222','333');//首先移除两个元素，然后添加三个元素
console.log(removedItems);
console.log(ttt);

// 9.1.4 数组常用操作

// foreach 方法

ttt.forEach(elemet=>{
   console.log(elemet);
});


//映射数组
const  weaponarr = [
    {name:'t1',weapon:'w111'},
    {name:'t2',weapon:'w222'},
    {name:'t3',weapon:'w333'},
    {name:'t4'},

];


const  weapons =  weaponarr.map(ele=>ele.weapon);
console.log(weapons);


//测试数组元素
//内置every方法 接收回调函数作为参数，会对每个参数执行该回调函数，如果所有元素数组的回调结果都返回true 则返回true
const  allnamed = weaponarr.every(ele=> "name" in ele);
const  allnweapon = weaponarr.every(ele=> "weapon" in ele);

console.log(allnamed,allnweapon);

//内置some方法  有一个true 就是true

const  allnweapons = weaponarr.some(ele=> "weapon" in ele);
console.log(allnweapons);






























