//map是一组键值对的结构，具有极快的查找速度
var m = new Map([["jim",20],["lucy",18]]);
res = m.get("lucy");
console.log(res);

//使用map查找很快，无论数据有多大，速度都会变慢
m.set('Adam',28);
console.log(m.has('Adam'));
console.log((m.get('Adam')));
m.delete('Adam');
console.log(m.get('Adam'));


//set和map类似，set不允许重复



