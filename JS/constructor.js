var puppet = {
    reules:false
}

function Emperor() {
    this.rules = true;
    return puppet;
}


var emperor = new Emperor();

// assert(emperor === puppet,"this emperor is merely a puppet");
//
// assert(emperor.rules === false,"the puppet dose not know how to rule!");

//总结
//如果构造函数返回一个对象，则该对象将作为整个表达式的值返回，而传入构造函数的this将被丢弃
//但是，如果构造函数返回的是非对象类型，则忽略返回值，返回新创建的对象

if (emperor === puppet){

    console.log("this emperor is merely a puppet")
}


var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
console.log(obj.getAge(2015)); // 25



