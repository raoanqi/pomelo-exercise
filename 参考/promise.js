/**
 * promise类
 */
const STATE_PENDING = 'pending'
const STATE_FULFILLED = 'fulfilled'
const STATE_REJECTED = 'rejected'

class MyPromise {
  // 构造器中接收一个函数
  constructor(executor) {
    try {
      // todo: 注意这里的bind
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  // p的初始状态是pending
  state = STATE_PENDING

  // resolve时记录下来的值
  value = null

  // reject时记录下来的reason
  reason = null

  // 在处理异步操作的过程中，在pending时并不能确定执行哪一个，需要等后面状态确定了才能确定执行哪一个，所以需要有回调列表来存储这些数据
  // then方法在执行时如果还是pending状态，就将对应的回调函数保存到对应的数组中
  onFulfilledCallback = []
  onRejectedCallback = []

  // resolve方法
  resolve(value) {
    if (this.state !== STATE_PENDING) return
    this.state = STATE_FULFILLED
    this.value = value
    // 变为resolve的时候，其中的每一个回调都要执行
    this.onFulfilledCallback.forEach(callback => callback(value))
    // 执行完之后清空回调数组
    this.onFulfilledCallback = []
  }

  //reject方法
  reject(reason) {
    if (this.state !== STATE_PENDING) return
    this.state = STATE_REJECTED
    this.reason = reason
    // 变为reject的时候，其中的每一个回调都要执行
    this.onRejectedCallback.forEach(callback => callback(reason))
    // 执行完之后清空回调数组
    this.onRejectedCallback = []
  }

  // then方法
  then(onFulfilled, onRejected) {
    /**
     * 按照规范，then中的参数是可以省略的
     * 如果对应的参数省略，then内部赋予对应的默认的方法
     * 对于onFulfilled，默认方法可以设置为value=>value，接收的参数是什么，直接返回即可
     * 对于onRejected,默认方法可以设置为reason=>throw reason，直接将接收到的reason throw出来
     * 请注意：对于onRejected，默认方法不能设置为reason=>reason，因为这种并不能让reason被后续的catch捕获到
     */
    if (!onFulfilled) onFulfilled = value => value
    if (!onRejected) onRejected = reason => throw reason
    /**
     * 按照规范，then需要返回一个promise，这个promise用来给后面的then或者catch进行链式调用
     */
    return new MyPromise((resolve, reject) => {
      /**
       * 因为then在进行链式调用的时候能接收到前一个promise的结果
       * 所以这里用try catch包裹，并将上一个promise的结果即this.value传入对应的回调中
       */
      if (this.state === STATE_FULFILLED) {
        try {
          resolve(onFulfilled(this.value))
        } catch (error) {
          reject(error)
        }
      } else if (this.state === STATE_REJECTED) {
        /**
         * reject的处理情况与resolve的情况一致
         */
        try {
          resolve(onRejected(this.reason))
        } catch (error) {
          reject(error)
        }
      } else if (this.state === STATE_PENDING) {
        /**
         * pending的处理与上述类似，唯一不同的地方就是pending状态的回调不是立刻去执行
         * 而是放入对应的回调函数队列，等待后面promise的状态发生改变时才拿出来执行
         */
        this.onFulfilledCallback.push(value => {
          try {
            resolve(onFulfilled(value))
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallback.push(reason => {
          try {
            resolve(onRejected(reason))
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
}

module.exports = MyPromise