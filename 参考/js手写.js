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
    while (level > 0) {
        if (that.some(ele => Array.isArray(ele))) {
            that = [].concat.apply([], that)
            level--
        }
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
        if (args.length > fn.length) {
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
    } else if (target instanceof Date()) {
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