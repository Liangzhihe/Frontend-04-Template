class Dog {
  constructor(name) {
    this.name = name
  }
  
  get bite() {
    return `${this.name}\`s bite`
  }
}

class Human {
  constructor(name) {
    this.name = name
  }
  
  hurt(reason) {
     console.log(`I hurt by ${reason}`)
  }
}

const dog1 = new Dog('snoopy')
const person1 = new Human('张三')

person1.hurt(dog1.bite)

