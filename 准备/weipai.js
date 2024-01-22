/**
 * 微派网络
 */

/**
 * 代码输出
 */

let num = 10;
let obj = {
  num: 20,
  run: function () {
    console.log(this.num);
    this.num = 30;
  },
};
// 20
obj.run();
let run = obj.run;
// undefined
run();
// 10
console.log(num);
// 30
console.log(obj.num);

/**
 * 两数相加
 */
const addTwoNumbers = function (l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  const dummy = new ListNode(-1)
  let current = dummy, carry = 0
  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = x + y + carry
    carry = Math.floor(sum / 10)
    current.next = new ListNode(sum % 10)
    current = current.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  if (carry > 0) current.next = new ListNode(carry)
  return dummy.next
};

/**
 * 给定一个整数n，表示有0,1,2,3,...,n的连续n+1个整数
 * 现在创建一个长度为n的数组，随机从前面n+1个数中取n个数放进去，那么还剩一个元素没有放进去
 * 现在需要你找出这个元素是什么
 * 要求时间复杂度为O(n)，空间复杂度为O(1)
 */

const findNumber = (n, arr) => {
  let sum = n * (n + 1) / 2
  for (let i = 0; i < n; i++) {
    sum -= arr[i]
  }
  return sum
}

/**
 * 树转数组
 */
const treeToArray = tree => {
  const arr = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.pop()
    arr.push({
      id: node.id,
      name: node.name,
      parentId: node.parentId
    })
    if (node?.children?.length) {
      stack.push(...node.children.map(child => ({...child, parentId: node.id})))
    }
  }
  return arr
}
const sourceTree = [
  {
    id: 1,
    name: 'text1',
    children: [
      {
        id: 2,
        name: 'text2',
        children: [
          {
            id: 4,
            name: 'text4'
          }
        ]
      },
      {
        id: 3,
        name: 'text3'
      }
    ]
  }
]
console.log('树转数组')
console.log(treeToArray(sourceTree))

/**
 * 数组转树
 */
const arrayToTree = arr => {
  const map = new Map()
  for (let item of arr) {
    item.children = []
    map.set(item.id, item)
  }
  const tree = []
  for (let item of arr) {
    const {id, parentId} = item
    if (parentId !== null) {
      const parentNode = map.get(item.parentId)
      if (parentId) parentNode.children.push(item)
    } else {
      tree.push(item)
    }
  }
  return tree
}
const sourceArray = [
  {id: 2, name: '部门B', parentId: null},
  {id: 3, name: '部门C', parentId: 1},
  {id: 1, name: '部门A', parentId: 2},
  {id: 4, name: '部门D', parentId: 1},
  {id: 5, name: '部门E', parentId: 2},
  {id: 6, name: '部门F', parentId: 3},
  {id: 7, name: '部门G', parentId: 2},
  {id: 8, name: '部门H', parentId: 4}
]
console.log('数组转为树')
console.log(arrayToTree(sourceArray))

/**
 * 寻找数组中非重复的第二大元素
 */
const secondLargestNumber = arr => Array.from(new Set(arr)).sort((a, b) => b - a)[1]
console.log('test', secondLargestNumber([2, 3, 3, 2, 4, 5]))   // 4

/**
 * apply
 */
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  if (Array.isArray(args)) throw new Error('不是数组')
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

/**
 * call
 */
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

/**
 * bind
 */
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') throw new Error('不是函数')
  const that = this
  return function F(...newArgs) {
    return this instanceof F ? new that(...args, ...newArgs) : that.apply(context, args.concat(newArgs))
  }
}

/**
 * new
 */
const newFunc = function (fn, ...args) {
  if (typeof fn !== 'function') throw new Error('不是函数')
  let obj = {}
  obj.__proto__ = fn.prototype
  const res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}

/**
 * 手写虚拟滚动
 */

/**
 * 发布订阅模式
 */
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

/**
 * Promise.all
 */
const myAll = function (pArr) {
  const result = [], len = pArr.length
  let index = 0
  return new Promise(function (resolve, reject) {
    for (let p of pArr) {
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

/**
 * Promise.race
 */
const myRace = function (pArr) {
  return new Promise(function (resolve, reject) {
    for (let p of pArr) {
      Promise.resolve(p).then(function (res) {
        return resolve(res)
      }, function (error) {
        return reject(error)
      })
    }
  })
}

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
myAll([p1, p2, p3]).then(res => console.log(res))  // p1

console.log('race测试')
myRace([p1, p2, p3]).then(res => console.log(res))  // [p1,p2,p3]
