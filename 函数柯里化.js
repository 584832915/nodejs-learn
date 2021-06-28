// function fn(a,b,c){
//     console.log(a,b,c)
// }
// console.log(fn.length)




function curring(fn){
    let inner = (args=[])=>{
        return args.length >= fn.length?fn(...args) : (...newArgs)=> inner([...args,...newArgs])
    }
   return inner()
    
}

function sum(a,b,c,d){
    return a+b+c+d
}
// let cur = curring(sum)
// let sum1 = cur(1);
// let sum2 = sum1(2,3)
// let result= sum2(4)
//  console.log(result)

function isType(fn){
    let inner = (args=[])=>{
        return args.length >= fn.length?fn(...args) : (...newArgs)=>inner([...args,...newArgs])
    }
   return inner()
}

function setType (type,val){
    return Object.prototype.toString.call(val) == `[object ${type}]`
}

let util = {};
// let arr = 
['String','Number','Object','Function','Null','Undefined'].forEach(type=>{
    util[`is${type}`] =  isType(setType)(type)
})
// console.log(util.isString('1111111'))

// let isString = isType(setType)('String');
// let isNumber = isType(setType)('Number') 
// let isObject = isType(setType)('Object') 
// console.log(isObject({})) 
// console.log(isString('0111111'))//true
// console.log(isNumber(222222222))//true
// console.log(isNumber({}))//false
const Obj = {
    userInfo:{
        userName:"hahahah"
    }
}
const userName = Obj?.userInfo?.userName;
console.log(userName)
