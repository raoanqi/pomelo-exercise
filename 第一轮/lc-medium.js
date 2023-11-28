// 两数相加
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode(0)
  let current = dummy, carry = 0
  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = carry + x + y
    carry = Math.floor(sum / 10)
    current.next = new ListNode(sum % 10)
    current = current.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  if (carry > 0) current.next = new ListNode(carry)
  return dummy.next
}

// 无重复字符的最长子串
const lengthOfLongestSubstring = str => {
  let maxLen = 0, start = 0
  const map = new Map(), len = str.length
  for (let i = 0; i < len; i++) {
    if (map.has(str[i]) && map.get(str[i]) >= start) {
      start = map.get(str[i]) + 1
    }
    map.set(str[i], i)
    maxLen = Math.max(maxLen, i - start + 1)
  }
  return maxLen
}

// 最长回文子串
const longestPalindrome = str => {
  if (!str || str.length < 2) return str
  let maxLen = 1, start = 0
  const len = str.length
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

// 盛水最多的容器
const maxArea = height => {
  const len = height.length
  if (len < 2) return 0
  let maxValue = 0, left = 0, right = len - 1
  while (left < right) {
    const currentValue = Math.min(height[left], height[right]) * (right - left)
    maxValue = Math.max(maxValue, currentValue)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return maxValue
}

// 三数之和

const threeSum = nums => {
  nums.sort((a, b) => a - b)
  const len = nums.length, res = []
  if (len < 3) return res
  for (let i = 0; i < len - 2; i++) {
    const current = nums[i]
    let left = i + 1, right = len - 1
    if (i > 0 && nums[i - 1] === nums[i]) continue
    while (left < right) {
      if (current + nums[left] + nums[right] < 0) {
        left++
        while (left < right && nums[left - 1] === nums[left]) {
          left++
        }
      } else if (current + nums[left] + nums[right] > 0) {
        right--
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }
      } else {
        res.push([current, nums[left], nums[right]])
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
