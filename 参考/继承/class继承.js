class Parent {
  constructor(name) {
    this.name = name
  }

  getName() {
    console.log(this.name)
  }
}

// true，说明class本质上只是函数的语法糖
Parent instanceof Function

class Child extends Parent {
  constructor(name, age) {
    // 子类的构造器中通过super调用父类的构造器，并将参数传递给父类的构造器
    super(name)
    this.age = age
  }

  getAge() {
    console.log(this.age)
  }
}

// 实例化子类
const child = new Child('testName', 18)
child.getName()
child.getAge()
