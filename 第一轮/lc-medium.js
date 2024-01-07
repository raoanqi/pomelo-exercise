// 两数相加
const addTwoNumbers = (l1, l2) => {
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
}

//无重复字符的最长子串
const lengthOfLongestSubstring = str => {
  const map = new Map(), len = str.length
  if (len === 1) return 1
  let maxLen = 0, start = 0
  for (let i = 0; i < len; i++) {
    const char = str[i]
    if (map.has(char) && map.get(char) >= start) start = map.get(char) + 1
    map.set(char, i)
    maxLen = Math.max(maxLen, i - start + 1)
  }
  return maxLen
}

//最长回文子串
const longestPalindrome = str => {
  if (!str || str.length < 2) return str
  const len = str.length
  let maxLen = 1, start = 0
  const expand = (left, right) => {
    while (left >= 0 && right < len && str[left] === str[right]) {
      const currentLen = right - left + 1
      if (currentLen > maxLen) {
        maxLen = currentLen
        start = left
      }
      left--
      right++
    }
  }
  for (let i = 0; i < len; i++) {
    expand(i, i)
    expand(i, i + 1)
  }
  return str.substring(start, start + maxLen)
}

//盛水最多的容器
const maxArea = heights => {
  const len = heights.length
  let left = 0, right = len - 1, maxWater = 0
  while (left < right) {
    maxWater = Math.max(maxWater, Math.min(heights[left], heights[right]) * (right - left))
    if (heights[left] < heights[right]) {
      left++
    } else {
      right--
    }
  }
  return maxWater
}

//三数之和
const threeSum = nums => {
  nums.sort((a, b) => a - b)
  if (!nums || nums.length < 3) return []
  const len = nums.length, res = []
  for (let i = 0; i < len - 2; i++) {
    const currentNumber = nums[i]
    let left = i + 1, right = len - 1
    if (i > 0 && nums[i - 1] === nums[i]) continue
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] < 0) {
        left++
        while (left < right && nums[left - 1] === nums[left]) {
          left++
        }
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }
      } else {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        while (left < right && nums[left - 1] === nums[left]) {
          left++
        }
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }
      }
    }
  }
  return res
}

//电话号码的字母组合
const letterCombinations = digits => {
  const res = []
  if (!digits) return res
  const digitsMap = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  }
  const traceback = (current, nextDigits) => {
    if (nextDigits.length === 0) {
      res.push(current)
    } else {
      const letters = digitsMap[nextDigits[0]], len = letters.length
      for (let i = 0; i < len; i++) {
        traceback(current + letters[i], nextDigits.slice(1))
      }
    }
  }
  traceback('', digits)
  return res
}

//删除链表的倒数第N个节点
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(-1)
  dummy.next = head
  let slow = dummy, fast = dummy
  for (let i = 0; i <= n; i++) {
    fast = fast.next
  }
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}

//括号生成
const generateParenthesis = n => {
  const res = []
  const traceback = (current, openCount, closeCount) => {
    if (current.length === 2 * n) {
      res.push(current)
      return
    }
    if (openCount < n) {
      traceback(current + '(', openCount + 1, closeCount)
    }
    if (closeCount < openCount) {
      traceback(current + ')', openCount, closeCount + 1)
    }
  }
  traceback('', 0, 0)
  return res
}

//下一个排列
const nextPermutation = nums => {
}

//搜索旋转排序数组
const search = (nums, target) => {
  const len = nums.length
  let left = 0, right = len - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) return mid
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}

//在排序数组中查找元素的第一个和最后一个位置
const searchRange = (nums, target) => {
}

//组合总和
const combinationSum = (candidates, target) => {
  const res = []
  const backtrace = (combination, start, target) => {
    if (target === 0) {
      res.push([...combination])
      return
    }
    if (target < 0) return
    const len = candidates.length
    for (let i = start; i < len; i++) {
      combination.push(candidates[i])
      backtrace(combination, i, target - candidates[i])
      combination.pop()
    }
  }
  backtrace([], 0, target)
  return res
}

//全排列
const permute = nums => {
  const res = [], len = nums.length
  const backtrace = (current) => {
    if (current.length === len) {
      res.push([...current])
      return
    }
    for (let i = 0; i < len; i++) {
      if (current.includes(nums[i])) continue
      current.push(nums[i])
      backtrace(current)
      current.pop()
    }
  }
  backtrace([])
  return res
}

//旋转图像
const rotate = matrix => {
  const len = matrix.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len / 2; j++) {
      [matrix[i][j], matrix[i][len - 1 - j]] = [matrix[i][len - 1 - j], matrix[i][j]]
    }
  }
}

//字母异位词分组
const groupAnagrams = strs => {
  const map = new Map()
  for (let str of strs) {
    const sortedStr = str.split('').sort().join()
    if (!map.has(sortedStr)) {
      map.set(sortedStr, [str])
    } else {
      const temp = map.get(sortedStr)
      temp.push(str)
      map.set(sortedStr, temp)
    }
  }
  return Array.from(map.values())
}

// 最大子数组和
const maxSubArray = nums => {
  const len = nums.length
  let res = nums[0], currentSum = nums[0]
  for (let i = 1; i < len; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i])
    res = Math.max(res, currentSum)
  }
  return res
}

//跳跃游戏
const canJump = nums => {
  const len = nums.length
  let lastIndex = len - 1
  for (let i = len - 1; i >= 0; i--) {
    if (i + nums[i] >= lastIndex) lastIndex = i
  }
  return lastIndex === 0
}

//合并区间
const mergeIntervals = intervals => {
  const len = intervals.length
  if (len < 2) {
    return intervals
  }
  intervals.sort((a, b) => a[0] - b[0])
  const res = [intervals[0]]
  for (let i = 1; i < len; i++) {
    if (intervals[i][0] <= res[res.length - 1][1]) {
      res[res.length - 1][1] = Math.max(intervals[i][1], res[res.length - 1][1])
    } else {
      res.push(intervals[i])
    }
  }
  return res
}

//不同路径
const uniquePaths = (m, n) => {

}

//最小路径和
const minPathSum = grid => {

}

// 编辑距离
const minDistance = (word1, word2) => {
  const len1 = word1.length, len2 = word2.length, map = new Map()

  /**
   * @param i
   * @param j
   * @returns {`${string},${string}`}
   * 这里注意，不要使用[i,j]的数组作为map的key，有可能会重复，所以使用字符串
   */
  const getKey = (i, j) => `${i},${j}`
  const dp = (i, j) => {
    if (i === -1) return j + 1
    if (j === -1) return i + 1

    const key = getKey(i, j)
    if (map.get(key)) return map.get(key)

    if (word1[i] === word2[j]) {
      map.set(key, dp(i - 1, j - 1))
    } else {
      map.set(key, Math.min(dp(i, j - 1) + 1, dp(i - 1, j) + 1, dp(i - 1, j - 1) + 1))
    }

    return map.get(key)
  }
  return dp(len1 - 1, len2 - 1)
}

//颜色分类
const sortColors = nums => {

}