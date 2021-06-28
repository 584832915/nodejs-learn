
const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

class Promise {
    constructor(executor){
        this.state = PENDING;
        this.value = undefined;//成功value
        this.reason = undefined;//失败原因
        this.resolvedCallbacks = []//成功回调
        this.rejectedCallbacks = []//失败回调
       const resolve=(value)=>{
           if(this.state == PENDING){
                this.state = FULFILLED
                this.value = value
                this.resolvedCallbacks.forEach(fn=>fn())
           }
        }
        const reject = (reason)=>{
            if(this.state ==PENDING ){
                this.state = REJECTED
                this.reason = reason
                this.rejectedCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulFilled,onRejected){
        let Promise2 = new Promise((resolve,reject)=>{
            if(this.state == FULFILLED){//成功
                try{
                    let x = onFulFilled(this.value)
                    resolve(x)
                }catch (err){
                    reject(err)
                }
            }
            if(this.state == REJECTED){//失败
                try{
                    let x =  onRejected(this.reason)
                    resolve(x)
                }catch(err){
                    reject(err)
                }
            }
            if(this.state == PENDING){//如果请求中,异步调用
                this.resolvedCallbacks.push(()=>{
                    try{
                        let x =  onFulFilled(this.value)
                        resolve(x)
                    }catch(err){
                        reject(err)
                    }
                }) 
                this.rejectedCallbacks.push(()=>{
                    try{
                        let x =  onRejected(this.reason)
                        resolve(x)
                    }catch(err){
                        reject(err)
                    }
                })
            }
        })
        return Promise2
    }
}

module.exports = Promise