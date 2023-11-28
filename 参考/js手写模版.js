// apply
Function.prototype.myApply = function (context, args) {
}

// call
Function.prototype.myCall = function (context, ...args) {
}

// bind
Function.prototype.myBind = function (context, ...args) {
}

// instanceof
const myInstanceof = function (obj, fn) {
}

// new
const myNew = function (fn, ...args) {
}

// debounce
const debounce = function (fn, delay) {
}

// throttle
const throttle = function (fn, delay) {
}

// flat
Array.prototype.myFlat = function (level = 1) {
}

// reduce
Array.prototype.myReduce = function (fn, initValue) {
}

// curry
const curry = function (fn) {
}

// deep clone
const deepClone = function (target) {
}

// sleep
const sleep1 = duration => {
}
const sleep2 = duration => {
}

// 发布订阅模式
class PubSub {
  constructor() {
    this.content = {}
  }

  on(type, fn) {
  }

  once(type, fn) {
  }

  off(type, fn) {
  }

  clear(type) {
  }

  emit(type, ...args) {
  }
}

// 数组去重
const arrUnique1 = arr => {
}
const arrUnique2 = arr => {
}
const arrUnique3 = arr => {
}