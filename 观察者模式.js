class Children {
    constructor(name){
        this.name = name
        this.state = "开心"
        this.partents = []
    }
    attach(p){
        this.partents.push(p)
    }
    toParent(state){
        this.state = state;
        this.partents.forEach(p=>p.know(this.name,state))
    }   
}

class Parent {
    constructor(name){
        this.name = name;
    }
    know(name,state){
        console.log(`${name}${state}了`)
    }
}
const children = new Children("孩子")
const parent1 = new Parent("妈妈") 
const parent2 = new Parent("爸爸") 
children.attach(parent1)
children.attach(parent2)
children.toParent('不开心')  