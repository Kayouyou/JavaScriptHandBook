//使用map构造函数创建map
const mymap = new Map();
//定义三个对象
const m1 = {name:'yoshi'};
const m2 = {name:'baga'};
const m3 = {name:'yamdi'};
//使用map的set方法 建立两个对象的映射关系
mymap.set(m1,{homeisland:'honshu'});
mymap.set(m2,{homeisland:'bonshu'});
mymap.set(m3,{homeisland:'tonshu'});

//get
console.log(mymap.get(m1));
//has
console.log(mymap.has(m3));
//delete
console.log(mymap.delete(m2));
//clear
console.log(mymap.clear());

//9.2.3  遍历map

const directory = new Map();
directory.set('yoshi','12536');
directory.set('yoshh','53621');
directory.set('yosii','65433');
//每个元素是有两个值的数组
for (let item of directory){
    console.log(item[1]);
}


// 9.3 set
//通过对象模拟set
// function Set() {
//     this.data = {};
//     this.length = 0;//使用对象存储数据
// }
//
// Set.prototype.has = function (item) {
//   return typeof  this.data[item] !== 'undefined';//检查元素是否已经存在
// };
//
// Set.prototype.add = function (item) {
//   if (!this.has(item))
//   {
//       this.data[item] = true;
//       this.length++;
//   }
// };
//
// Set.prototype.remove = function (item) {
//
//     if (this.has(item)){
//         delete this.data[item];
//         this.length--;
//     }
// };
//
// const  nin = new Set();
// nin.add("jim");
// nin.add('mark');
// console.log(nin);

const myset = new Set(["kuma","hatton","yagou","hatton"]);
console.log(myset.size);
console.log(myset.has("kuma"));

















































