//爬楼梯
// 时间复杂度O(n)
// 空间复杂度O(1)
const stairs = (n) => {
  if (n <= 0) return 0
  if (n === 1) return 1
  if (n === 2) return 2
  let n1 = 1, n2 = 2, res = 0
  for (let i = 3; i <= n; i++) {
    res = n1 + n2
    n1 = n2
    n2 = res
  }
  return res
}

// 69 x的平方根
/**
 * @param x
 * @returns {number|*}
 *
 */
const mySqrt = x => {
  if ([0, 1].includes(x)) return x
  let left = 1, right = x
  // 涉及到左右双指针的题目，一定要注意这个等于的边界条件
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (mid * mid < x) {
      left = mid + 1
    } else if (mid * mid > x) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return right
};

// 118 杨辉三角
const generate = numRows => {
  // 第一行的元素就是[1]，直接添加
  const res = [[1]]
  // 从第二行开始，循环构建
  for (let i = 1; i < numRows; i++) {
    // 构建第i行元素要依靠上一行元素，取出来，避免反复读取数组元素
    const prevRow = res[i - 1]
    // 每一行的第一个元素都是1，直接写上
    const currRow = [1]
    // 循环计算元素
    for (let j = 1; j < i; j++) {
      currRow[j] = prevRow[j - 1] + prevRow[j]
    }
    currRow.push(1)
    res.push(currRow)
  }
  return res
};

// 171 Excel表列序号
/**
 * @param columnTitle
 * @returns {number}
 * 实际上这道题可以看做26进制转换
 */
const titleToNumber = columnTitle => {
  let res = 0
  const len = columnTitle.length, startCode = 'A'.charCodeAt(0)
  for (let i = 0; i < len; i++) {
    // 获取当前元素的数值大小
    const currentNumber = columnTitle.charCodeAt(i) - startCode + 1
    // res更新：因为增加了一个元素的数据，所以用前一个res*26进制，再加上当前的数值，就是更新之后的结果
    res = res * 26 + currentNumber
  }
  return res
};


// 202 快乐数
/**
 * @param n
 * @returns {boolean}
 * 判断关键：如果是快乐数，那么在循环过程中必然会出现重复元素
 */
const isHappy = n => {
  // 创建集合来存储已经出现过的元素
  const set = new Set()
  // 计算下一轮循环的结果
  const nextNumber = number => {
    let sum = 0
    while (number > 0) {
      const currentDigit = number % 10
      sum += currentDigit * currentDigit
      number = Math.floor(number / 10)
    }
    return sum
  }
  // 开始循环，循环条件注意：
  // 两个条件必须都要满足
  // 首先n不是1，如果是1，那么肯定是快乐数，直接跳出循环
  // 并且不能是set中已经有的数据，一旦出现循环，说明就不是快乐数
  while (n !== 1 && !set.has(n)) {
    set.add(n)
    n = nextNumber(n)
  }
  return n === 1
};


// 326 3的幂
/**
 * @param n
 * @returns {boolean}
 * 如果是3的幂，那么就可以一直被3整除直到最后是1
 */
const isPowerOfThree = n => {
  if (n <= 0) return false
  while (n > 1) {
    // n大于1的时候，一直除以3，直到n小于等于1时，跳出循环
    n = n / 3
  }
  // 判断跳出循环之后n是不是1，如果是，那么n就是3的，否则就不是
  return n === 1
};


// 412 Fizz Buzz
const fizzBuzz = n => {
  const res = []
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      res.push('FizzBuzz')
    } else if (i % 3 === 0) {
      res.push('Fizz')
    } else if (i % 5 === 0) {
      res.push('Buzz')
    } else {
      res.push(i.toString())
    }
  }
  return res
};

// LRU缓存
/**
 * LRU算法特点：最近最少使用
 * get：
 * 访问一个数据时，如果数据存在，需要将这项数据的位置置换到队列尾部
 * put：
 * 写入数据时，需要将数据放在队列尾部
 *
 * 这里使用map结构进行实现，map是有序数据结构（按照数据进入map的顺序排列）
 */
class LRU {
  constructor(capacity) {
    this.capacity = capacity
    this.content = new Map()
  }

  // 获取缓存
  get(key) {
    const value = this.content.get(key)
    if (!value) return -1
    // 如果数据存在，就先删除再设置，这样确保最新访问的数据在队列的最后
    this.content.delete(key)
    this.content.set(key, value)
    return value
  }

  // 写入缓存
  put(key, value) {
    // 如果map中已经存在这个数据，就先删除
    if (this.content.has(key)) {
      this.content.delete(key)
    } else if (this.content.size === this.capacity) {
      // 如果map的容量已经满了，先删除头部的数据
      this.content.delete(this.content.keys().next().value)
    }
    // 然后将数据在map尾部塞入
    this.content.set(key, value)
  }
}

// 最小栈
/**
 * 最小栈：能够在常数时间内获取到栈中的最小元素的栈
 * 题目需要支持以下方法：
 * 入栈
 * 出栈
 * 获取栈顶元素
 * 在常数时间内获取到栈的最小元素（常数时间：就是直接知道位置，然后取出来）
 */
const MinStack = () => {
  // stack：真正的栈
  // minstack：辅助栈，辅助栈中，从栈顶开始，元素按照从小到大的顺序进行排列，这样获取最小的元素的时候，直接取栈顶元素就行，不用进行搜素，就是常数时间
  this.stack = []
  this.minStack = []
}
MinStack.prototype.push = val => {
  // 将元素入栈
  this.stack.push(val)
  // 维护辅助栈：如果辅助栈为空，或者当前元素小于辅助栈的栈顶元素，那么就把元素加到辅助栈的栈顶，这样能确保栈顶元素始终是当前栈中最小的元素
  if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(val)
  }
}
MinStack.prototype.pop = () => {
  const poped = this.stack.pop()
  // 出栈之前判断下是不是弹出的最小元素，如果是的话，辅助栈中的栈顶元素即最小元素也要弹出
  if (poped === this.minStack[this.minStack.length - 1]) this.minStack.pop()
  return poped
}
MinStack.prototype.top = () => this.stack[this.stack.length - 1]
// 栈的最小元素就是辅助栈的栈顶元素
MinStack.prototype.getMin = () => this.minStack[this.minStack.length - 1]

// 岛屿数量
// 这里使用dfs深度优先遍历来求解
/**
 * 二维数组的dfs：深度优先，所以实际就是按照第一行，第二行直至最后一行的顺序进行遍历
 * 二维数组的bfs：广度优先，所以实际就是按照第一列，第二列直至最后一列的顺序进行遍历
 */
const numIslands = grid => {
  // 如果grid不存在或者没有包含元素，岛屿数量就是0个
  if (!grid || !grid.length) return 0
  const rows = grid.length, cols = grid[0].length
  let count = 0
  const dfs = (i, j) => {
    // 设置终止条件，其中判断节点元素是否为0是为了判断节点是否已经访问过
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') return
    // 标记为已访问，并对这个的四周元素进行dfs
    grid[i][j] = '0'
    dfs(i - 1, j) // 上
    dfs(i + 1, j) // 下
    dfs(i, j - 1) // 左
    dfs(i, j + 1) // 右
  }
  for (let i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(i, j)
      }
    }
  }
  return count
}

// 课程表
/**
 * 使用拓扑排序来解决
 * 拓扑排序：针对一类特定的图问题，针对的就是有向无环图
 *
 * 在本题中，课程之间的关联是有方向的，但是不可能有环，在本题一旦出现环，说明有课程之间形成了闭环，就是循环依赖，那么肯定无法修完全部课程
 */
const canFinish = (numCourses, prerequisites) => {
  const graph = new Map()
  const inDegree = new Array(numCourses).fill(0)
  // 构建图和入度数组
  // 入度数组inDegree：
  for (const [course, prerequisite] of prerequisites) {
    if (!graph.has(prerequisite)) {
      graph.set(prerequisite, [])
    }
    graph.get(prerequisite).push(course)
    inDegree[course]++
  }
  const queue = []
  let count = 0

  // 将入度为0的元素添加到queue中
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }

  while (queue.length > 0) {
    const course = queue.shift()
    count++
    if (graph.has(course)) {
      for (const dependentCourse of graph.get(course)) {
        inDegree[dependentCourse]--
        if (inDegree[dependentCourse] === 0) queue.push(dependentCourse)
      }
    }
  }
  return count === numCourses
}

//整数转罗马数字
var intToRoman = function (num) {
  /**
   * @type {number[]}
   * 定义好所有的罗马字母，以及对应的数字，然后依靠循环去判断如何将这些数字组合为目标的num
   */
  const numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const romas = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  const numberLen = numbers.length
  let res = ''
  for (let i = 0; i < numberLen; i++) {
    while (num >= numbers[i]) {
      res += romas[i]
      num -= numbers[i]
    }
  }
  return res
};

// 7 整数反转
const reverse = x => {
  const flag = x < 0 ? -1 : 1
  const temp = flag < 0 ? x.toString().slice(1) : x.toString()
  const res = flag < 0 ? Number(temp.split('').reverse().join('')) * -1 : Number(temp.split('').reverse().join(''))
  return (res >= -Math.pow(2, 31) && res <= Math.pow(2, 31) - 1) ? res : 0
};

// 38 外观数列
/**
 * @param n
 * @returns {string}
 * 时间复杂度：O(m*n)，m为字符串的平均长度，n就是题目的输入参数
 * 空间复杂度：O(m)，m是字符串的平均长度，就是temp在循环过程中占用的
 */
const countAndSay = n => {
  // res记录计算中的每一项，初始化时就是’1‘
  let res = '1'
  // 开始循环
  for (let i = 1; i < n; i++) {
    // temp用于在每一轮计算中保存当前轮的计算结果，因此初始化就是''
    // count用于计算内部相同字符的数量，因此初始化就是1
    let temp = '', count = 1
    // 循环遍历n-1的计算结果，对其进行描述
    for (let j = 0; j < res.length; j++) {
      // 循环过程中，如果发现相等，count就自增
      if (res[j] === res[j + 1]) {
        count++
      } else {
        // 如果不相等，就把这一段的结果追加到temp字符串上
        // 这里注意是count+res[j]，而不是count+res[j+1]，因为如果不相等，那么res[j+1]实际上已经是下一个不相等的元素了
        temp += count + res[j]
        // 找到一串相等的字符之后，并将计数器count重置为1
        count = 1
      }
    }
    // 将当前一轮的计算结果赋值给res，供下一轮进行计算
    res = temp
  }
  return res
};

// 50 Pow(x,n)
/**
 * @param x
 * @param n
 * @returns {number}
 * 时间复杂度：O(logn)
 */
const myPow = (x, n) => {
  // 对于等于1的特殊情况
  if (n === 0 || x === 1 || (x === -1 && n % 2 === 0)) return 1
  // 对于等于-1的特殊情况
  if (x === -1 && n % 2 === -1) return -1
  // 如果n小于0，可以转换为计算1/x的-n次方
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  let res = 1
  while (n > 0) {
    // 如果n是奇数，先单独计算一次，这样n-1就是偶数了，就可以使用快速算法进行计算，例如x^2,x^4,x^8
    if (n % 2 === 1) res *= x
    x *= x
    n = Math.floor(n / 2)
  }
  return res
};

// 166 分数到小数
/**
 * @param numerator
 * @param denominator
 * @returns {string}
 * 请注意一个数学特性，分数属于有理数，而有理数即使出现循环也一定是循环小数
 * 而无线不循环小数是无理数，与本题不符，所以本题不用考虑无限不循环小数
 * 也就是说，本题的计算结果要么是可以整数，要么是有限小数，要么是无限循环小数
 */
const fractionToDecimal = (numerator, denominator) => {
  // 如果分子是0，直接返回0
  if (numerator === 0) return '0'
  let res = ''
  // tips：按位异或可以计算乘除的符号
  res += (numerator > 0) ^ (denominator > 0) ? '-' : ''
  // 取绝对值
  numerator = Math.abs(numerator)
  denominator = Math.abs(denominator)
  // 计算整数部分
  res += Math.floor(numerator / denominator)
  // 计算余数，如果余数为0，说明能够整除，所以直接返回res
  let remainder = numerator % denominator
  if (remainder === 0) return res
  // 如果余数不是0，说明存在小数部分，先给res加上.
  res += '.'
  // 创建map，存储余数出现的位置
  const map = new Map()
  // 只要余数不为0，就一直循环
  while (remainder !== 0) {
    /**
     * 如果map中已经存在了这个余数，说明发现了循环小数
     */
    if (map.has(remainder)) {
      res = res.substring(0, map.get(remainder)) + '(' + res.substring(map.get(remainder)) + ')'
      break
    }
    /**
     * 记录当前余数出现时，res的长度
     */
    map.set(remainder, res.length)
    /**
     * 余数乘以10，是为了直接计算出余数的数
     * 例如：余数为2，分母为3，如果不乘以10直接计算，就是0.6666，这样与之前的res不好拼接
     * 但是2乘以10之后，20/3=6.6666，res直接拼接Math.floor的结果就可以，简化了计算
     */
    remainder *= 10
    res += Math.floor(remainder / denominator)
    remainder %= denominator
  }
  return res
};


// 172 阶乘后的零
/**
 * @param n
 * @returns {number}
 * 在尾部有一个0，说明可以被10除掉一次，在尾部有两个0，说明可以被10除掉2次
 * 因此尾部0的个数实际上是由阶乘中出现10的次数决定的，在1-9的算子中，可以计算得到10的只有2*5
 * 而在阶乘的过程中，5的任意倍数与2的任意倍数相乘必然会得到10的倍数，但是也要注意到在阶乘过程中
 * 2的倍数的出现次数比5的倍数的出现次数要多，所以直接计算阶乘中有多少个5的倍数就行
 * 时间复杂度：O(log5^n)
 */
const trailingZeroes = n => {
  let count = 0
  while (n > 0) {
    /**
     * @type {number}
     * 每次直接除以5，说明n到Math.floor(n/5之间)有多少个5的倍数，然后叠加
     */
    n = Math.floor(n / 5)
    count += n
  }
  return count
};


// 179 最大数
// todo：其中的排序需要继续研究
const largestNumber = nums => {
  nums.sort((a, b) => {
    const strA = a.toString()
    const strB = b.toString()
    return (strB + strA) - (strA + strB)
  })
  const res = nums.join('')
  // 有可能输入是[0,0]，这样会得到00的输出，因此要判断res开头是不是0，如果是0，那么直接返回0
  return res[0] === '0' ? '0' : res
};

// 204 计数质数
/**
 * @param n
 * @returns {number}
 * 时间复杂度：O(nlog(logn))
 */
const countPrimes = n => {
  // n不大于2，直接返回0，不存在质数
  if (n <= 2) return 0
  // 初始化一个长度为n的数组，每一项均初始化为true，后续在迭代中逐个判断每一项的值是否需要修改
  const isPrime = new Array(n).fill(true)
  // 数组的第0,1项分别代表数字0,1，这两个都不是质数，因此设置为false
  isPrime[0] = false
  isPrime[1] = false
  // 从数字2开始判断，一直到n-1，判断其中有多少质数
  for (let i = 2; i < n; i++) {
    /**
     * 如果一个数不是质数，那么不用管，直接跳过
     * 如果一个数是质数，那么这个质数的2倍，3倍，。。。都不会是质数，因为可以被2,3，。。。整除
     * 所以这部分的对应的数组项全部更新为false
     * 循环结束之后，数组中剩下true的数量，就是要求的质数的数量
     */
    if (isPrime[i]) {
      for (let j = 2 * i; j < n; j += i) {
        isPrime[j] = false
      }
    }
  }
  return isPrime.filter(item => item).length
};

//赎金信
var canConstruct = function (ransomNote, magazine) {
  /**
   * @type {Map<any, any>}
   * 构建一个map，存储magazine中各个字符的出现次数
   */
  const charCount = new Map()
  for (let char of magazine) charCount.set(char, (charCount.get(char) || 0) + 1)
  /**
   * 遍历randomNote,如果其中的某个字符在map中不存在，那么必然无法组成，返回false
   * 如果其中的某个字符虽然存在，但是已经被前面的子串所使用完，那么也返回false
   * 否则，就更新map中对应字符的次数
   * 如果for循环能整个循环完毕，那么说明就可以组成，返回true
   */
  for (let char of ransomNote) {
    if (!charCount.has(char) || charCount.get(char) === 0) return false
    charCount.set(char, charCount.get(char) - 1)
  }
  return true
};

// 278 第一个错误的版本
/**
 * @param isBadVersion
 * @returns {function(*): number}
 * 采用二分查找
 * 时间复杂度：O(logn)
 */
const solution = isBadVersion => {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1, right = n
    while (left < right) {
      let mid = Math.floor((left + right) / 2)
      if (isBadVersion(mid)) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  };
};








