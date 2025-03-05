const fns = new Set()
let activeFn

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)

      if (typeof res === 'object' && res !== null) {
        return reactive(res)
      }

      if (activeFn) {
        fns.add(activeFn)
      }

      return res
    },
    set(target, key, value, receiver) {
      fns.forEach(fn => fn())
      return Reflect.set(target, key, value, receiver)
    }
  })
}

function effect(fn) {
  activeFn = fn
  fn()
}

// 测试
const user = reactive({ name: 'NAME', info: { age: 18 } })
effect(() => {
  console.log('name', user.name)
})
// 修改属性，自动触发effect内部函数执行
user.name = '张三'
// user.info.age = 10 // 修改深层次对象
setTimeout(() => {
  user.name = '李四'
})
