//电话号码的字母组合
/**
 * 类似于全排列这样的问题，都可以使用回溯算法解决下面的算法比较好套用了回溯算法的算法框架
 */
const letterCombinations = digits => {
  const res = []
  if (!digits) return res
  // 存储数字对应的字母，请注意在js对象中，key只能是字符串或者symbol，如果写成数字会自动转换成字符串
  const digitsMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }
  const traceback = (current, nextDigits) => {
    if (nextDigits.length === 0) {
      // 如果nextDigits长度变为0，说明已经处理完毕
      res.push(current)
    } else {
      // 如果nextDigits长度不为0，说明还有数字需要处理
      // letters：当前数字对应的字母集合
      // len：当前数字对应的字母集合的长度
      const letters = digitsMap[nextDigits[0]], len = letters.length
      for (let i = 0; i < len; i++) {
        traceback(current + letters[i], nextDigits.slice(1))
      }
    }
  }
  traceback('', digits)
  return res
}

// todo:细节需要进一步掌握
//括号生成
const generateParenthesis = n => {
  const res = []
  // current：当前生成的括号组合
  // openCount：已经使用的左括号的数量
  // closeCount：已经使用的右括号的数量
  const backtrace = (current, openCount, closeCount) => {
    // 如果当前生成的括号组合的长度等于2n，说明已经生成了一个有效的括号组合，将其加入到res数组中
    if (current.length === 2 * n) res.push(current)
    // 如果左括号的使用数量小于n，说明还可以继续添加左括号
    if (openCount < n) backtrace(current + '(', openCount + 1, closeCount)
    // 如果右括号的使用数量小于左括号的使用数量，说明还可以继续添加右括号
    if (closeCount < openCount) backtrace(current + ')', openCount, closeCount + 1)
  }
  backtrace('', 0, 0)
  return res
}

// 组合总和
const combinationSum = (candidates, target) => {
  // 回溯函数
  // combination：已经生成的总和
  // start：从数组的哪个位置开始取数字
  // target：剩余的目标和
  const backtrace = (combination, start, target) => {
    // 如果target为0，说明已经达到了求和目标，直接将当前的combination赋值为res
    if (target === 0) {
      return res.push([...combination])
    }
    // 如果target小于0，说明目前求和的值已经超过了题目中需要寻找的target，说明当前组合不符合要求，使用return终止
    if (target < 0) return
    const len = candidates.length
    for (let i = start; i < len; i++) {
      // 对于数组中的每一个元素，在每一轮循环中分别将其固定，然后使用回溯来判断是否能够找到符合要求的元素
      combination.push(candidates[i])
      backtrace(combination, i, target - candidates[i])
      // 注意这个移除最后元素的步骤，这个是回溯算法的关键步骤
      // 撤销选择，回到上一步
      combination.pop()
    }
  }
  const res = []
  backtrace([], 0, target)
  return res
}

// 全排列
const permute = nums => {
  const res = [], len = nums.length
  const backtrace = (current) => {
    if (current.length === len) {
      res.push([...current])
      return
    }
    for (let i = 0; i < len; i++) {
      // 如果当前正在生成的排列current中已经包含了nums[i]，那么就跳过
      // 防止生成[1,1,1],[1,1,2]类似的排列
      if (current.includes(nums[i])) continue
      current.push(nums[i])
      backtrace(current)
      current.pop()
    }
  }
  backtrace([])
  return res
}

// 子集
const subsets = nums => {
  // 初始化
  const len = nums.length, res = []
  // 开始回溯，回溯的关键参数（当前结果：subset，所有的选择：startIndex）
  const backtrace = (subset, startIndex) => {
    // 这里并没有终止条件，题目中的子集可以是nums的
    // 任何子集，包含空集与全集，所以直接添加
    res.push([...subset])
    for (let i = startIndex; i < len; i++) {
      subset.push(nums[i])
      backtrace(subset, i + 1)
      // 回溯的经典步骤：撤销操作，回到上一步，然后去遍历多叉树的另一个分支
      subset.pop()
    }
  }
  // 回溯开始时，用于遍历的subset为[]，startIndex也是从0开始
  backtrace([], 0)
  return res
}



