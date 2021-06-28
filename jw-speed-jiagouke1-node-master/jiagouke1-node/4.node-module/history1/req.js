const fs = require('fs');
const path = require('path');
const vm = require('vm');
class Module{
    constructor(id){
        this.id = id
        this.exports={}
    }
    load(){
        let ext = path.extname(this.id); // 获取文件后缀名
        Module._extensions[ext](this);
    }
}
Module._cache = {}
Module._extensions = {
    '.js'(module){
        let script = fs.readFileSync(module.id,'utf8');//同步读取文件
        let templateFn = `(function(exports,module,require,__dirname,__filename){${script}})`;
        let fn = vm.runInThisContext(templateFn);//运行上下文，运行模板字符串
        // let fn1 = (function(exports,module,require,__dirname,__filename){
        //             eval(script)
        //         })
        let exports = module.exports;
        let thisValue = exports; // this = module.exports = exports;
        let filename = module.id;
        let dirname = path.dirname(filename);//取当前文件的父路径
        // 函数的call 的作用 1.改变this指向 2.让函数执行
        fn.call(thisValue,exports,module,req,dirname,filename); // 调用了a模块 module.exports = 100;
    },
    '.json'(module){
        let script = fs.readFileSync(module.id,'utf8');
        module.exports = JSON.parse(script)
    }
}
Module._resolveFilename = function(id){
    let filePath = path.resolve(__dirname,id)
    let isExists = fs.existsSync(filePath);//是否存在文件后缀，返回布尔值
    if(isExists) return filePath;//如果存在，直接返回
    // 如果不存在，for循环尝试添加后缀
    let keys = Object.keys(Module._extensions); // 以后Object的新出的方法 都会放到Reflect上
    for(let i =0; i < keys.length;i++){
       let newPath = filePath + keys[i];
       if(fs.existsSync(newPath)) return newPath
    }
    throw new Error('module not found')
}
function req(filename){
    filename = Module._resolveFilename(filename); // 1.创造一个绝对引用地址，方便后续读取
    let cacheModule = Module._cache[filename]
    if(cacheModule) return cacheModule.exports; // 直接将上次缓存的模块丢给你就ok了
    const module = new Module(filename); // 2.根据路径创造一个模块
    console.log(module)
    Module._cache[filename] = module; // 最终：缓存模块 根据的是文件名来缓存
    module.load(); // 就是让用户给module.exports 赋值
    return module.exports; // 默认是空对象
}
let a = req('./a.js');
a = req('./a.js');
a = req('./a.js');
console.log(a)