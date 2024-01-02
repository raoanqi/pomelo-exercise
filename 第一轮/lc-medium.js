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