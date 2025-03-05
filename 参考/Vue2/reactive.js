class Dep {
  // 静态属性，直接通过class进行访问
  static stack = []
  static target = null
  // 实例属性，每一个实例都会有，这个等效于在构造器中写
  deps = null

  constructor() {
    this.deps = new Set()
  }

  // 依赖收集
  depend() {
    if (Dep.target) {
      this.deps.add(Dep.target)
    }
  }

  // 通知更新
  notify() {
    this.deps.forEach(d => d.update())
  }

  static pushTarget(t) {
    if (this.target) {
      this.stack.push(this.target)
    }
    this.target = t
  }

  static popTarget(t) {
    this.target = this.stack.pop()
  }
}

function reactive(o) {
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(k => defineReactive(o, k, o[k]))
  }
  return o
}

function defineReactive(obj, k, val) {
  let dep = new Dep()
  Object.defineProperty(obj, k, {
    get() {
      dep.depend()
      return val
    },
    set(newVal) {
      val = newVal
      dep.notify()
    }
  })
  if (val && typeof val === 'object') {
    reactive(val)
  }
}

class Watcher {
  constructor(effect) {
    this.effect = effect
    this.update()
  }

  update() {
    Dep.pushTarget(this)
    this.value = this.effect()
    Dep.popTarget()
    return this.value
  }
}
