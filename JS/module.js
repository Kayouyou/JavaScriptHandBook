// 使用对象，闭包和立即执行函数实现模块
//模块系统的基本要求：隐藏实现细节，定义模块接口

//11.1 模块模式
//创建一个全局模块变量，赋值为立即执行函数的执行结果
const MouseCountermodule = function () {
    let numCicks = 0;//双肩私有变量
    const handleClick = ()=>{
      console.log(++numCicks);
    };//创建私有函数

    return {
        countClicks:()=>{
            document.addEventListener("click",handleClick);
        }//返回一个对象，代表模块的接口，通过闭包，可以访问模块私有变量和方法
    }
}();
// 通过使用立即执行函数，我们可以隐藏制定的模块执行细节，通过添加对象和闭包我们可以定义模块接口，通过接口暴露模块的功能

//模块扩展 在前面的模块中增加附加特性，但是不能修改模块的代码

//创建一个立即调用函数，该函数接收需要扩展的模块作为参数

(function (module) {
    let numScrolls = 0;
    const handleScroll=()=>{
        console.log(++numScrolls);
    }
    module.countScrolls=()=>{
      document.addEventListener("wheel",handleScroll);
    };//扩展模块接口
})(MouseCountermodule);//将模块传入作为参数

MouseCountermodule.countClicks();
MouseCountermodule.countScrolls();

//通过独立的立即执行函数扩展模块，无法共享模块私有变量，因为每个函数都分别创建了新的作用域
































































