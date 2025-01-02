// apply
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  if (!Array.isArray(args)) throw new Error('不是数组')
  context = Object(context || window)
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

// call
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  context = Object(context || window)
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

// bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  const that = this
  return function F(...newArgs) {
    if (this instanceof F) return new that(...args, ...newArgs)
    return that.apply(context, args.concat(newArgs))
  }
}

// instanceof
const myInstanceof = function (obj, fn) {
  if (obj === null || typeof obj !== 'object') return false
  while (obj) {
    if (obj.__proto__ === fn.prototype) return true
    obj = obj.__proto__
  }
  return false
}

// new
const myNew = function (fn, ...args) {
  if (typeof fn !== 'function') throw new Error('不是函数')
  let obj = {}
  obj.__proto__ = fn.prototype
  const res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}

// debounce
const debounce = function (fn, delay) {
  let timer
  // 如果该标志为true，代表是第一次执行，那么就不要延迟，立即执行
  let immediate = true
  return function (...args) {
    const context = this
    if (immediate) {
      fn.apply(context, args)
      immediate = false
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

// throttle
const throttle = function (fn, delay) {
  let startTime = 0
  return function (...args) {
    const nowTime = +new Date()
    if (nowTime - startTime > delay) {
      startTime = nowTime
      fn.apply(this, args)
    }
  }
}

// flat：注意这个方法，非常巧妙
Array.prototype.myFlat = function (level = 1) {
  if (!Array.isArray(this)) throw new Error('不是数组')
  if (typeof level !== 'number' || level <= 0) return this
  let that = this
  while (level > 0 && that.some(ele => Array.isArray(ele))) {
    that = [].concat.apply([], that)
    level--
  }
  return that
}

// reduce
Array.prototype.myReduce = function (fn, initValue) {
  if (!Array.isArray(this)) throw new Error('不是数组')
  if (typeof fn !== 'function') throw new Error('fn不是函数')
  const len = this.length
  let previousValue = typeof initValue === 'undefined' ? this[0] : initValue
  let index = typeof initValue === 'undefined' ? 1 : 0
  while (index < len) {
    previousValue = fn(previousValue, this[index], index, this)
    index++
  }
  return previousValue
}

// curry
const curry = function (fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...newArgs) {
        return curried.apply(this, args.concat(newArgs))
      }
    }
  }
}

// 深拷贝
const deepClone = function (target) {
  if (typeof target !== 'object' || target === null) return target
  let res
  if (Array.isArray(target)) {
    res = []
    const len = target.length
    for (let i = 0; i < len; i++) {
      res[i] = deepClone(target[i])
    }
  } else if (target instanceof RegExp) {
    res = new RegExp(target)
  } else if (target instanceof Date) {
    // getTime()：获取对应时间的时间戳
    res = new Date(target.getTime())
  } else {
    res = {}
    const keys = Object.keys(target)
    for (let key of keys) {
      res[key] = deepClone(target[key])
    }
  }
  return res
}

// sleep
const sleep1 = duration => {
  for (let startTime = +new Date(); +new Date() - startTime < duration; ) {}
}
const sleep2 = duration => new Promise(resolve => setTimeout(resolve, duration))

// 发布订阅模式
class EventBus {
  constructor() {
    this.content = {}
  }

  on(type, fn) {
    if (this.content[type]) {
      this.content[type].push(fn)
    } else {
      this.content[type] = [fn]
    }
  }

  once(type, fn) {
    const onceFn = (...args) => {
      fn(...args)
      this.off(type, fn)
    }
    this.on(type, onceFn)
  }

  off(type, fn) {
    this.content[type] = (this.content[type] ?? []).filter(item => item !== fn)
  }

  clear(type) {
    delete this.content[type]
  }

  emit(type, ...args) {
    this.content[type].forEach(fn => fn(...args))
  }
}

// 观察者模式：观察者观察主题
// 主题
class Subject {
  // 存储观察者和数据
  constructor() {
    this.observers = []
    this.state = null
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer)
  }

  // 通知观察者
  notifyObserver() {
    this.observers.forEach(o => o.update(this.state))
  }

  // 更新数据
  setState(state) {
    this.state = state
    this.notifyObserver()
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }

  update(state) {
    console.log('state is updated')
  }
}

// 示例使用
const subject = new Subject()

const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.setState('State 1')
// Observer 1 notified of state change to: State 1
// Observer 2 notified of state change to: State 1

subject.removeObserver(observer1)

subject.setState('State 2')
// Observer 2 notified of state change to: State 2

// 数组去重
const arrUnique1 = arr => Array.from(new Set(arr))
const arrUnique2 = arr => arr.filter((ele, index) => index === arr.indexOf(ele))
const arrUnique3 = arr => {
  arr.sort((a, b) => a - b)
  const len = arr.length
  const res = [arr[0]]
  for (let i = 1; i < len; i++) {
    arr[i - 1] !== arr[i] && res.push(arr[i])
  }
  return res
}

// 手写shuffle随机打乱一个数组(bfe 8)
// todo
/**
 * @param arr
 * 洗牌算法
 */
const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    // 在每一次迭代中，生成一个随机索引 j，范围在当前元素索引 i 到数组末尾之间（包括 i 和末尾）
    const j = i + Math.floor(Math.random() * (arr.length - i))
    // 整体而言，这个算法遍历数组，每次迭代都随机选择一个元素与当前位置的元素进行交换，从而达到打乱数组顺序的目的
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

// 实现一个composition方法(bfe 11)
// todo
const pipe = funcs => {
  return function (arg) {
    return funcs.reduce((result, func) => {
      return func.call(this, result)
    }, arg)
  }
}

// 实现一个特殊的sum方法(bfe 23)
/**
 * @param num
 * @returns {any}
 * const sum1 = sum(1)
 * sum1(2) == 3 // true
 * sum1(3) == 4 // true
 * sum(1)(2)(3) == 6 // true
 * sum(5)(-1)(2) == 6 // true
 */

function sum(num) {
  const func = function (num2) {
    return num2 ? sum(num + num2) : num
  }

  func.valueOf = () => num
  return func
}

// promise.all
Promise.myAll = function (promises) {
  const result = [],
    len = promises.length
  let index = 0
  // all接收一个promise的数组，返回值也是一个promise
  return new Promise((resolve, reject) => {
    // 如果接收到一个空数组，直接resolve([])，不要处理
    if (len === 0) return resolve([])
    for (let p of promises) {
      // 对于每一个p，不一定是promise，所以需要用resolve进行包裹
      Promise.resolve(p).then(
        function (res) {
          result[index] = res
          index++
          if (result.length === len) return resolve(result)
        },
        function (error) {
          return reject(error)
        }
      )
    }
  })
}

// promise.race
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(
        function (res) {
          return resolve(res)
        },
        function (error) {
          return reject(error)
        }
      )
    }
  })
}

// 测试
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'p1')
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'p2')
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'p3')
})
console.log('all测试')
Promise.myAll([p1, p2, p3]).then(res => console.log(res)) // [p1,p2,p3]

console.log('race测试')
Promise.myRace([p1, p2, p3]).then(res => console.log(res)) // p1

// promise.allSettled
/**
 * @param promises
 * @returns {Promise<Awaited<unknown>[]>}
 * promise.all中只要有任何一个promise是reject。整个promise就会立刻变为reject状态，只有全部promise都resolve，才会执行.then中的成功的回调
 * promise.allSettled中会等到全部的promise都变为最终状态才会返回
 */
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({
          status: 'fulfilled',
          value
        }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  )
}

// promise.any
// 任意一个p被resolve，直接resolve，如果全部都reject，返回一个AggregateError错误
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = []
    promises.forEach((promise, index) => {
      promise.then(
        data => {
          return resolve(data)
        },
        error => {
          errors[index] = error

          if (errors.length === promises.length) {
            reject(new AggregateError(errors))
          }
        }
      )
    })
  })
}

// promise.resolve
/*
如果传入普通值：如果传入普通值，Promise.resolve 会返回一个已解决的 Promise，并将该值作为 resolve 的结果。
如果传入的是Promise：直接返回这个Promise
如果传入的是一个包含then方法的对象：会调用对象中的then方法，并且使行为与promise一致化
*/
Promise.myResolve = function (value) {
  if (value instanceof Promise) {
    return value
  }
  // 否则返回一个新的 Promise 并 resolve
  return new Promise(resolve => resolve(value))
}

// 测试promise.resolve
// 传入普通值
Promise.myResolve(42).then(value => console.log(42, value)) // 输出: 42
// 传入promise
const originalPromise = Promise.resolve('Hello')
const newPromise = Promise.myResolve(originalPromise)
console.log(true, originalPromise === newPromise) // 输出: true
// 传入thenable对象
const thenableObject = {
  then: (resolve, reject) => {
    resolve(666)
  }
}
Promise.myResolve(thenableObject).then(value => console.log(value)) // 输出：666

// promise.reject
Promise.myReject = function (reason) {
  return new Promise((_, reject) => {
    reject(reason)
  })
}

// 测试promise.reject
Promise.myReject('Error occurred')
  .then(() => {
    console.log('Resolved')
  })
  .catch(err => {
    console.log(err) // 输出: Error occurred
  })

// promise.try
Promise.myTry = function (fn) {
  return new Promise((resolve, reject) => {
    try {
      const result = fn() // 执行传入的函数
      resolve(result) // 如果成功，解析 Promise
    } catch (error) {
      reject(error) // 如果抛出错误，拒绝 Promise
    }
  })
}

// 测试promise.try
// 示例 1: 成功情况
Promise.myTry(() => {
  console.log('Executing function...')
  return 'Success!'
}).then(result => {
  console.log(result) // 输出: Success!
})
// 示例 2: 抛出错误的情况
Promise.myTry(() => {
  throw new Error('Something went wrong')
}).catch(err => {
  console.error(err.message) // 输出: Something went wrong
})

// JSON.stringify
// 关键在于各个表边界条件的控制
function stringify(data) {
  // your code here
  if (typeof data === 'bigint') {
    throw new Error('Do not know how to serialize a BigInt at JSON.stringify')
  }
  if (typeof data === 'string') {
    return `"${data}"`
  }
  if (typeof data === 'function') {
    return undefined
  }
  if (data !== data) {
    return 'null'
  }
  if (data === Infinity) {
    return 'null'
  }
  if (data === -Infinity) {
    return 'null'
  }
  if (typeof data === 'number') {
    return `${data}`
  }
  if (typeof data === 'boolean') {
    return `${data}`
  }
  if (data === null) {
    return 'null'
  }
  if (data === undefined) {
    return 'null'
  }
  if (typeof data === 'symbol') {
    return 'null'
  }
  if (data instanceof Date) {
    return `"${data.toISOString()}"`
  }
  if (Array.isArray(data)) {
    const arr = data.map(el => stringify(el))
    return `[${arr.join(',')}]`
  }
  if (typeof data === 'object') {
    const arr = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc
      }
      acc.push(`"${key}":${stringify(value)}`)
      return acc
    }, [])
    return `{${arr.join(',')}}`
  }
}

// JSON.parse
// 关键在于各个表边界条件的控制
function parse(str) {
  if (str === '') {
    throw Error()
  }
  if (str[0] === "'") {
    throw Error()
  }
  if (str === 'null') {
    return null
  }
  if (str === '{}') {
    return {}
  }
  if (str === '[]') {
    return []
  }
  if (str === 'true') {
    return true
  }
  if (str === 'false') {
    return false
  }
  if (str[0] === '"') {
    return str.slice(1, -1)
  }
  if (+str === +str) {
    return Number(str)
  }
  if (str[0] === '{') {
    return str
      .slice(1, -1)
      .split(',')
      .reduce((acc, item) => {
        const index = item.indexOf(':')
        const key = item.slice(0, index)
        const value = item.slice(index + 1)
        acc[parse(key)] = parse(value)
        return acc
      }, {})
  }
  if (str[0] === '[') {
    return str
      .slice(1, -1)
      .split(',')
      .map(value => parse(value))
  }
}
