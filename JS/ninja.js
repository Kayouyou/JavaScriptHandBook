const ninja = "Yoshi";
const message = "hello";

function sayHiToNinja() {
    return message + "" + ninja;
}

//将所有的模块标识符全部导出
export {message,sayHiToNinja};