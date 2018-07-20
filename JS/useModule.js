/*
从ninja.js模块导入
 */

//使用关键字import从模块中导入标识符
// import {message,sayHiToNinja} from "./ninja";
import * as ninjaModule from "./ninja"


if (message === "hello"){
    console.log("we can access the imported variable");
}

