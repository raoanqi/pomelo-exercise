//两数之和
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
  const dummy = new ListNode(0)
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

//二叉树中序遍历
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

//对称二叉树
const isMirrorTree = root => {
  const isMirror = (node1, node2) => {
    if (!node1 && !node2) return true
    if (!node1 || !node2 || node1.val !== node2.val) return false
    return isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
  }
  if (!root) return true
  return isMirror(root.left, root.right)
}

//二叉树的最大深度
const maxDepth = root => {
  const calc = node => {
    if (!node) return 0
    return Math.max(calc(node.left), calc(node.right)) + 1
  }
  return calc(root)
}

//买卖股票的最佳时机
const sellStock = prices => {
  const len = prices.length
  let benefit = 0, lowest = prices[0]
  for (let i = 1; i < len; i++) {
    benefit = Math.max(benefit, prices[i] - lowest)
    lowest = Math.min(lowest, prices[i])
  }
  return benefit
}

//只出现一次的数字
const singleNumber = nums => {
  const len = nums.length
  let res = 0
  for (let i = 0; i < len; i++) {
    res ^= nums[i]
  }
  return res
}

//环形链表
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

//相交链表
const getIntersectionNode = (l1, l2) => {
  const set = new Set()
  //先将其中一条链表的节点全部加入set，set中存储的是地址
  while (l1) {
    set.add(l1)
    l1 = l1.next
  }
  //然后将第二条链表的节点依次添加，如果发现地址重合，说明遇到了相同的节点，这样就找到了相交的节点
  while (l2) {
    if (set.has(l2)) return l2
    l2 = l2.next
  }
  return null
}

//多数元素
//使用投票算法：需要确保元素出现的次数在总数的二分之一以上
const majorityElement = nums => {
  let count = 0, candidate
  for (let ele of nums) {
    /**
     * count为0，有两种情况：
     * 1.for循环刚开始
     * 2.循环中count先增大，然后被降为0，说明之前设置的候选元素肯定没有超过n/2，所以不是多数元素，所以此时要重新设置候选元素
     **/
    (count === 0) && (candidate = ele)
    // 出现了不同元素相当于就会对消之前的结果
    count += candidate === ele ? 1 : -1
  }
  return candidate
}

//反转链表
const reverseList = head => {
  let prev = null; // 前一个节点
  let curr = head; // 当前节点
  while (curr !== null) {
    const next = curr.next; // 下一个节点
    curr.next = prev; // 将当前节点的 next 指针指向前一个节点
    prev = curr; // 更新前一个节点为当前节点
    curr = next; // 当前节点后移
  }
  return prev; // 返回反转后的链表头节点
}

//翻转二叉树
const invertTree = root => {
  // 根节点为空就直接返回null
  if (!root) return null
  // 使用递归翻转左右两侧的子树
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  // 为根节点的左右子树重新赋值
  root.left = right
  root.right = left
  // 返回树的根节点
  return root
}

//回文链表
const isPalindrome = l1 => {
// 定义函数翻转链表
  const reverseLinkList = node => {
    let prev = null, current = node
    while (current) {
      // 记录current的next，防止循环过程中覆盖后值丢失
      let next = current.next
      current.next = prev
      prev = current
      current = next
    }
    return prev
  }
  // 空链表或者只有一个节点，算作回文链表
  if (!l1 || !l1.next) return true
  // 使用快慢指针找到链表的中间位置
  let slow = l1, fast = l1
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  // 翻转后半部分链表
  let reverseLastHalf = reverseLinkList(slow)
  // 分别从头和尾开始遍历
  let p1 = l1, p2 = reverseLastHalf
  while (p2) {
    if (p1.val !== p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }
  return true
}

//移动零
const moveZeroes = nums => {
  const len = nums.length
  if (!len) return
  let count = 0
  for (let i = 0; i < len - count; i++) {
    if (nums[i] === 0) {
      nums.push(0)
      nums.splice(i, 1)
      i--
      count++
    }
  }
}

//比特位计数
const countBits = n => {
  const count = num => {
    let count = 0
    while (count !== 0) {
      num = num & num - 1
      count++
    }
    return count
  }
  const res = []
  for (let i = 0; i <= n; i++) {
    res.push(count(i))
  }
  return res
}

//找到所有数字中消失的数字
/**
 * @param nums
 * @returns {*[]}
 * 将数组转换为集合操作，集合的查找时间复杂度是O(1)
 */
const findDisappearedNumbers = nums => {
  const res = [], len = nums.length, set = new Set(nums)
  for (let i = 1; i <= len; i++) {
    if (!set.has(i)) {
      res.push(i)
    }
  }
  return res
}

//汉明距离
//使用异或运算：两个数异或，结果中1的个数就是汉明距离
const hammingDistance = (x, y) => {
  let xorRes = x ^ y, count = 0
  while (xorRes !== 0) {
    xorRes = xorRes & (xorRes - 1)
    count++
  }
  return count
}

//二叉树的直径
const diameterOfBinaryTree = root => {
  let diameter = 0
  // 定义函数计算节点的最大深度
  const calcDepth = node => {
    if (!node) return 0
    const leftDepth = calcDepth(node.left), rightDepth = calcDepth(node.right)
    // 计算过程不断更新直径
    diameter = Math.max(diameter, leftDepth + rightDepth)
    // 因为使用递归运算计算深度，所以每次向下递归一层，深度值都要+1
    return Math.max(leftDepth, rightDepth) + 1
  }
  calcDepth(root)
  return diameter
}

//合并二叉树
const mergeTrees = (root1, root2) => {
  if (!root1) return root2
  if (!root2) return root1
  const mergeNode = new TreeNode(root1.val + root2.val)
  mergeNode.left = mergeTrees(root1.left, root2.left)
  mergeNode.right = mergeTrees(root1.right, root2.right)
  return mergeNode
}

//移除元素
var removeElement = function (nums, val) {
  const len = nums.length
  let count = 0
  for (let i = 0; i < len - count; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1)
      i--
      count++
    }
  }
  return len - count
};

//删除有序数组中的重复项
var removeDuplicates = function (nums) {
  const len = nums.length
  let count = 0
  for (let i = 0; i < len - count - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1)
      i--
      count++
    }
  }
  return len - count
};

//相同的树
var isSameTree = function (p, q) {
  const compareNode = (nodeA, nodeB) => {
    if (!nodeA && !nodeB) return true
    if ((!nodeA || !nodeB) || (nodeA.val !== nodeB.val)) return false
    return compareNode(nodeA.left, nodeB.left) && compareNode(nodeA.right, nodeB.right)
  }
  return compareNode(p, q)
};

//回文数
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false
  const original = x
  let reverse = 0
  // 注意这个翻转数字的方式
  while (x > 0) {
    reverse = reverse * 10 + x % 10
    x = Math.floor(x / 10)
  }
  return original === reverse
};

//加一
var plusOne = function (digits) {
  const len = digits.length
  for (let i = len - 1; i >= 0; i--) {
    digits[i]++
    // 如果加上1之后不用进位，那么就直接返回
    if (digits[i] < 10) return digits
    // 如果加上1之后需要进位，那么这一位就会变为0
    digits[i] = 0
  }
// 遍历完数组之后，如果还没有return，说明每一位都发生了进位
// 此时数组中的每一个位置都是0，那么直接在前面补一位就可以了
  return [1, ...digits]
};

// 28 找出字符串中第一个匹配的下标
const strStr = (haystack, needle) => {
  const len = haystack.length, needleLen = needle.length;
  if (needleLen === 0) return 0
  let i = 0
  let j = 0
  // 开始遍历
  while (i < len) {
    /**
     * 如果此时的两个串对应的元素相等，判断是否已经遍历到了needle的最后一位
     * 如果是，那么主串中起始的索引就是i-needleLen+1
     * 如果子串还没有遍历完，那么两个串分别向后移动
     */
    if (haystack[i] === needle[j]) {
      if (j === needleLen - 1) return i - needleLen + 1;
      i++;
      j++;
    } else {
      // i-j：将 i 移动到上一个匹配点之后的位置
      /**
       * @type {number}
       * 如果两个不相等
       * 说明主串中的位置需要重新设置，之前设置的起始位置不对
       * 将主串的起始位置往后推一个，就是i-j+1
       * 另外，子串的位置要归零开始重新遍历，就是j=0
       */
      i = i - j + 1;
      j = 0;
    }
  }
  // 遍历完还没找到，就是-1
  return -1
};
// 验证回文串
var isPalindrome = function (str) {
  /**
   * @type {string}
   * 题目说明只包含数字和字符串，所以把所有的非数字以及非字符串全部删除，并转为小写符号便于统一处理
   */
  const pureString = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  /**
   * 如果str未定义，或者为空串，或者长度为1，那么必然就是回文串
   */
  if (!pureString || !pureString.length || pureString.length === 1) return true
  const pureStringLen = pureString.length
  /**
   * @type {number}
   * 否则就是用双指针法进行判断
   */
  let left = 0, right = pureStringLen - 1
  while (left < right) {
    if (pureString[left] === pureString[right]) {
      left++
      right--
    } else {
      return false
    }

  }
  return true
};

//判断子序列
var isSubsequence = function (s, t) {
  const sLen = s.length, tLen = t.length
  let sIndex = 0, tIndex = 0
  while (sIndex < sLen && tIndex < tLen) {
    if (s[sIndex] === t[tIndex]) {
      sIndex++
    }
    tIndex++
  }
  return sIndex === sLen
};

//汇总区间
var summaryRanges = function (nums) {
  const len = nums.length, res = []
  let i = 0
  while (i < len) {
    // j从i开始循环
    let j = i
    // 如果j的后一个元素依然没有超出范围，并且当前元素加一与后一个元素相等，那么就可以继续循环，j++
    while (j + 1 < len && nums[j] + 1 === nums[j + 1]) j++
    // 跳出while循环之后，说明找到了一个区间，此时判断j与i的关系，如果相当，说明这个区间的开始结束是同一个元素，那么直接push当前元素
    if (j === i) {
      res.push(`${nums[i]}`)
    } else {
      // 否则，说明区间中不止一个元素，此时就要push指定的数据结构
      res.push(`${nums[i]}->${nums[j]}`)
    }
    // 找到一个区间之后，i要指向j的后一个元素j+1，然后重新开始while循环
    i = j + 1
  }
  return res
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

// 同构字符串
var isIsomorphic = function (s, t) {
  // 二者长度不同，肯定不是同构的，直接false
  if (s.length !== t.length) return false
  const sLastIndex = {}, tLastIndex = {};
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];
    if (sLastIndex[charS] !== tLastIndex[charT]) return false
    sLastIndex[charS] = i;
    tLastIndex[charT] = i;
  }
  return true
};

// 单词规律
var wordPattern = function (pattern, str) {
  /**
   * @type {any}
   * 这里有一点要很注意，力扣的测试用例中，str中有的包含了constructor字符串，
   * 如果patternToWord，wordToPattern直接用{}，在取值时可能就直接取到了构造器函数，而不是题目指定的关系，那么就会干扰代码运行
   * 所以这里使用Object.create(null)，这样构造出来的对象，constructor属性就是undefined，不会干扰代码运行
   */
  const patternToWord = Object.create(null), wordToPattern = Object.create(null), patternLen = pattern.length,
      words = str.split(' '),
      wordLen = words.length
  if (patternLen !== wordLen) return false
  for (let i = 0; i < patternLen; i++) {
    const char = pattern[i], word = words[i]
    if (!patternToWord[char] && !wordToPattern[word]) {
      patternToWord[char] = word
      wordToPattern[word] = char
    } else {
      if (patternToWord[char] !== word || wordToPattern[word] !== char) {
        return false
      }
    }
  }
  return true
};

// 有效的字母异位词
var isAnagram = function (s, t) {
  const sLen = s.length, tLen = t.length
  if (sLen !== tLen) return false
  const sMap = {}
  for (let i = 0; i < sLen; i++) {
    if (!sMap[s[i]]) {
      sMap[s[i]] = 1
    } else {
      sMap[s[i]]++
    }
  }
  for (let i = 0; i < tLen; i++) {
    if (sMap[t[i]] > 0) {
      sMap[t[i]]--
    } else if (sMap[t[i]] === undefined || sMap[t[i]] === 0) {
      return false
    }
  }
  return true
};

// 存在重复元素2
var containsNearbyDuplicate = function (nums, k) {
  const len = nums.length
  // 题目说明数组长度至少是1，但是长度为1的话肯定不会有两个元素满足要求，那么直接返回false
  if (len === 1) return false
  const map = {}
  for (let i = 0; i < len; i++) {
    const currentNumber = nums[i]
    if (map[currentNumber] !== undefined && Math.abs(i - map[currentNumber]) <= k) return true
    map[currentNumber] = i
  }
  return false
};

//路径总和
var hasPathSum = function (root, targetSum) {
  // 如果当前的根节点为空，那么直接返回false
  if (!root) return false
  // 如果当前的根节点已经是叶子结点，那么就判断当前根节点的值是不是等于目标和
  if (!root.left && !root.right) return root.val === targetSum
  // 如果上面都不满足，那么就开始递归判断当前根节点的左右子树
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};

//完全二叉树的节点个数
var countNodes = function (root) {
  if (!root) return 0
  let leftHeight = 0, rightHeight = 0, left = root, right = root
  // 计算左子树的高度
  while (left) {
    leftHeight++;
    left = left.left;
  }
  // 计算右子树的高度
  while (right) {
    rightHeight++;
    right = right.right;
  }
  /**
   * 题目中说明，同一层中的元素不是满的，那么都会出现在树的左侧
   * 这样一来，如果发现某一层的右子树高度如果与左子树高度相等，那么说明这个二叉树必然就是满二叉树，此时可以直接使用2^n-1计算节点数量
   * 否则，就要递归进行计算
   */
  if (leftHeight === rightHeight) {
    return Math.pow(2, leftHeight) - 1;
  } else {
    // 如果不相等，递归计算左右子树的节点数
    return 1 + countNodes(root.left) + countNodes(root.right);
  }
};

// 链表的中间结点
/*
* 思路：使用双指针：快慢指针，快指针每次走两步，慢指针每次走一步，当快指针走到最后一个元素时，
* 如果链表长度为奇数，那么慢指针这个时候就指向中间结点
* 如果链表长度为偶数，那么慢指针这个时候就指向中间两个元素的后一个元素
* */
var middleNode = function (head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};

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

// 108 将有序数组转换为二叉搜索树
const sortedArrayToBST = nums => {
  // 如果数组为空，那么根节点直接就是null
  if (nums.length === 0) return null
  /**
   * 定义函数：生成对应的平衡二叉树的根节点
   */
  const buildTree = (left, right) => {
    // 如果左指针大于右指针，那么说明已经走完整个nums数组了
    if (left > right) return null
    // 以left和right的中间点进行分割得到当前一轮构建中的mid
    // 以mid为值构建tree node
    const mid = Math.floor((left + right) / 2)
    const root = new TreeNode(nums[mid])
    // 根据函数定义，buildtree能够构建以（left，right）为参数的二叉树
    // 那么得到root之后，开始构建root的左子树和右子树
    root.left = buildTree(left, mid - 1)
    root.right = buildTree(mid + 1, right)
    // 最后返回根节点即可
    return root
  }
  return buildTree(0, nums.length - 1)
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

// 191 位1的个数
const hammingWeight = n => {
  let res = 0
  while (n !== 0) {
    n = n & n - 1
    res++
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

// 217 存在重复元素
const containsDuplicate = nums => {
  const set = new Set()
  for (let item of nums) {
    if (!set.has(item)) {
      set.add(item)
    } else {
      return true
    }
  }
  return false
};

// 268 丢失的数字
/**
 * @param nums
 * @returns {number}
 * 将数组转换为集合操作，集合查找数据的时间复杂度是O(1)
 */
const missingNumber = nums => {
  const len = nums.length, set = new Set(nums)
  for (let i = 0; i <= len; i++) {
    if (!set.has(i)) return i
  }
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

// 344 反转字符串
const reverseString = s => {
  const len = s.length
  if (len === 1) return s
  for (let i = 0; i < Math.floor(len / 2); i++) {
    [s[i], s[len - 1 - i]] = [s[len - 1 - i], s[i]]
  }
  return s
};

// 350 两个数组的交集
const intersect = (nums1, nums2) => {
  const res = [], map = new Map()
  for (let item of nums1) {
    map.set(item, (map.get(item) || 0) + 1)
  }
  for (let item of nums2) {
    if (map.get(item) > 0) {
      res.push(item)
      map.set(item, map.get(item) - 1)
    }
  }
  return res
};

// 387 字符串中的第一个唯一字符
const firstUniqChar = s => {
  const len = s.length, map = new Map()
  if (len === 1) return 0
  for (let item of s) {
    map.set(item, (map.get(item) || 0) + 1)
  }
  for (let i = 0; i < len; i++) {
    if (map.get(s[i]) === 1) return i
  }
  return -1
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
