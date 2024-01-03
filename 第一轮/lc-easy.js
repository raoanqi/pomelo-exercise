// 两数之和
const twoNumberSum = (nums, target) => {
  const map = new Map(), len = nums.length
  for (let i = 0; i < len; i++) {
    let temp = target - nums[i]
    if (map.has(temp)) {
      return [map.get(temp), i]
    }
    map.set(nums[i], i)
  }
}

//有效括号
const validBrackets = str => {
  const stack = [], len = str.length
  for (let i = 0; i < len; i++) {
    if (['(', '[', '{'].includes(str[i])) {
      stack.push(str[i])
    } else {
      const peek = stack[stack.length - 1]
      if ((str[i] === ')' && peek === '(') || (str[i] === ']' && peek === '[') || (str[i] === '}' && peek === '{')) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

//合并两个有序链表
const mergeTwoLinkList = (l1, l2) => {
  if (!l1) return l2
  if (!l2) return l1
  const dummy = new ListNode(-1)
  let current = dummy
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1
      l1 = l1.next
    } else {
      current.next = l2
      l2 = l2.next
    }
    current = current.next
  }
  if (l1) current.next = l1
  if (l2) current.next = l2
  return dummy.next
}

//爬楼梯
const stairs = n => {
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

// 二叉树的中序遍历
const inOrderTraverse = root => {
  const res = []
  const traverse = node => {
    if (!node) return
    traverse(node.left)
    res.push(node.val)
    traverse(node.right)
  }
  traverse(root)
  return res
}

// 对称二叉树
const isMirrorTree = root => {
  if (!root) return true
  const isMirror = (node1, node2) => {
    if (!node1 && !node2) return true
    if (!node1 || !node2 || (node1.val !== node2.val)) return false
    return isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
  }
  return isMirror(root.left, root.right)
}

// 二叉树的最大深度
const maxDepth = root => {
  const calc = node => {
    if (!node) return 0
    return Math.max(calc(node.left), calc(node.right)) + 1
  }
  return calc(root)
}

// 买卖股票的最佳时机
const sellStock = prices => {
  let lowest = prices[0], benefit = 0
  for (let price of prices) {
    lowest = Math.min(price, lowest)
    benefit = Math.max(benefit, price - lowest)
  }
  return benefit
}

// 只出现一次的数字
const singleNumber = nums => {
  let res = 0
  for (let num of nums) {
    res ^= num
  }
  return res
}

// 环形链表
const hasCycle = head => {
  if (!head || !head.next) return false
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

// 相交链表
const getIntersectionNode = (l1, l2) => {
  if (!l1 || !l2) return null
  const set = new Set()
  while (l1) {
    set.add(l1)
    l1 = l1.next
  }
  while (l2) {
    if (set.has(l2)) return l2
    l2 = l2.next
  }
  return null
}

// 多数元素
const majorityElement = nums => {
  let count = 0, candidate
  for (let num of nums) {
    if (count == 0) {
      candidate = num
    }
    count += num === candidate ? 1 : -1
  }
  return candidate
}

// 反转链表
const reverseList = head => {
  let prev = null, current = head
  while (current) {
    const next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}

// 回文链表
const isPalindrome = head => {
  if (!head || !head.next) return true
  const reverse = listHead => {
    let prev = null, current = listHead
    while (current) {
      const next = current.next
      current.next = prev
      prev = current
      current = next
    }
    return prev
  }
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  const secondHalf = reverse(slow)
  let p1 = head, p2 = secondHalf
  while (p2) {
    if (p1.val !== p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }
  return true
}

// 移动0
const moveZeroes = nums => {
  const len = nums.length
  if (len < 2) return nums
  let count = 0
  for (let i = 0; i < len - count; i++) {
    if (nums[i] === 0) {
      nums.push(0)
      nums.splice(i, 1)
      i--
      count++
    }
  }
  return nums
}

// 比特位计数
const countBits = num => {
  const count = n => {
    let zeroNumber = 0
    while (n !== 0) {
      n = n & (n - 1)
      zeroNumber++
    }
    return zeroNumber
  }
  const res = []
  for (let i = 0; i <= num; i++) res.push(count(i))
  return res
}

// 找到所有数组中消失的数字
const findDisappearedNumbers = nums => {
}

// 汉明距离
const hammingDistance = (x, y) => {
  let xorRes = x ^ y, count = 0
  while (xorRes) {
    xorRes = xorRes & (xorRes - 1)
    count++
  }
  return count
}

// 二叉树的直径
const diameterOfBinaryTree = root => {
  let diameter = 0
  const calcDepth = node => {
    if (!node) return 0
    const leftDepth = calcDepth(node.left), rightDepth = calcDepth(node.right)
    diameter = Math.max(diameter, leftDepth + rightDepth)
    return Math.max(leftDepth, rightDepth) + 1
  }
  calcDepth(root)
  return diameter
}

// 合并二叉树
const mergeTrees = (root1, root2) => {
  if (!root1) return root2
  if (!root2) return root1
  const mergeRoot = new TreeNode(root1.val + root2.val)
  mergeRoot.left = mergeTrees(root1.left, root2.left)
  mergeRoot.right = mergeTrees(root1.right, root2.right)
  return mergeRoot
}
