// let Promise = require('./promise.js')
const fs = require("fs")
const Promise = require("../jw-speed-jiagouke1-node-master/jiagouke1-node/1.promise/source/3.promise")

// function readFile(filePath,encoding){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(filePath,encoding,(err,data)=>{
//             if(err) return reject(err)
//             resolve(data)
//         })
//     })
// }

// // readFile('./a.txt','utf8').then(res=>{
// //     console.log(res)
// // })


// let promise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         // reject('失败了')
//         resolve("成功了")
//     },1000)
   
// })

// promise.then((value)=>{
//     console.log(value,'成功')
//     return "成功"
// },(reason)=>{
//     console.log(reason,'失败')
// }).then(res=>{
//     console.log(res)
// })
// promise.then((value)=>{
//     console.log(value,'成功2')
// },(reason)=>{
//     console.log(reason,'失败2')
// })

function handleFs(fn){
    return function(...args){
            return new Promise((resolve,reject)=>{
                fn(...args,(err,data)=>{
                    if(err) return reject(err)
                    resolve(data)
                })
            })
    }
}

function handleAllFs(obj){
    let o={}
    for(let key in obj){
        if( typeof obj[key] =='function'){
            o[key+"demo"] = handleFs(obj[key])
        }
    }
    return o
}
const demo = handleAllFs(fs)

demo.readFiledemo('./a.txt','utf8').then(res=>{
    console.log(res)
})

