// apply
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  if (!Array.isArray(args)) throw new Error('不是数组')
  context = context || window
  context.fn = this
  const res = context.fn(...args)
  delete context.fn
  return res
}

// call
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  context = context || window
  context.fn = this
  const res = context.fn(...args)
  delete context.fn
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
  obj = obj.__proto__
  const fnPrototype = fn.prototype
  while (true) {
    if (obj === fnPrototype) return true
    if (obj === null || fnPrototype === undefined) return false
    obj = obj.__proto__
  }
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
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, arguments), delay)
  }
}

// throttle
const throttle = function (fn, delay) {
  let startTime = 0
  return function () {
    const nowTime = +new Date()
    if (nowTime - startTime > delay) {
      startTime = nowTime
      fn.apply(this, arguments)
    }
  }
}

// flat
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
  for (let startTime = +new Date(); +new Date() - startTime < duration;) {
  }
}
const sleep2 = duration => new Promise(resolve => setTimeout(resolve, duration))

// 发布订阅
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
    this.content[type] = this.content[type].filter(item => item !== fn)
  }

  clear(type) {
    delete this.content[type]
  }

  emit(type, ...args) {
    this.content[type].forEach(fn => fn(...args))
  }
}

// 数组去重
const arrUnique1 = arr => Array.from(new Set(arr))
const arrUnique2 = arr => arr.filter((ele, index) => index === arr.indexOf(ele))
const arrUnique3 = arr => {
  arr.sort((a, b) => a - b)
  const len = arr.length
  const res = [arr[0]]
  for (let i = 1; i < len; i++) {
    (arr[i - 1] !== arr[i]) && (res.push(arr[i]))
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
    const j = i + Math.floor(Math.random() * (arr.length - i));
    // 整体而言，这个算法遍历数组，每次迭代都随机选择一个元素与当前位置的元素进行交换，从而达到打乱数组顺序的目的
    [arr[i], arr[j]] = [arr[j], arr[i]]
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
    return num2 ? sum(num + num2) : num;
  }

  func.valueOf = () => num;
  return func;
}

// promise.all
const all = function (promises) {
  const result = [], len = promises.length
  let index = 0
  // all接收一个promise的数组，返回值也是一个promise
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      // 对于每一个p，不一定是promise，所以需要用resolve进行包裹
      Promise.resolve(p).then(function (res) {
        result[index] = res
        index++
        if (result.length === len) return resolve(result)
      }, function (error) {
        return reject(error)
      })
    }
  })
}

// promise.race
const race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let p of promises) {
      Promise.resolve(p).then(function (res) {
        return resolve(res)
      }, function (error) {
        return reject(error)
      })
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
all([p1, p2, p3]).then(res => console.log(res))  // [p1,p2,p3]

console.log('race测试')
race([p1, p2, p3]).then(res => console.log(res))  // p1