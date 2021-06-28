const fs = require("fs")


const event = {
    arr:[],
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach(fn=>fn())
    },
}
event.on(function (){
    console.log("1111111")
})
event.on(function(){
    console.log(222225)
})
fs.readFile('./a.txt','utf8',(err,data)=>{
    console.log(data)
    event.emit()
})