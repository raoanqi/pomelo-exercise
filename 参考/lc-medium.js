//两数相加
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode(0)
  // carry用于记录进位
  let current = dummy, carry = 0
  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = carry + x + y
    // sum除以10得到进位的数目
    carry = Math.floor(sum / 10)
    // 余数就是留在当前位置的数
    current.next = new ListNode(sum % 10)
    current = current.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  // 如果最后有进位，还要继续创建最后的一个节点
  if (carry > 0) {
    current.next = new ListNode(carry)
  }
  return dummy.next
}

//无重复字符的最长子串
const lengthOfLongestSubstring = s => {
  // maxLen：最长子串的长度
  // start：起始位置
  let maxLen = 0, start = 0
  // map：存储字符以及在字符串中的索引
  const map = new Map(), len = s.length
  for (let i = 0; i < len; i++) {
    const char = s[i]
    // 如果map中存储了char，并且再循环中再次遇到了这个字符char，说明遇到了重复的字符，
    // 那么之前的那个位置需要丢弃，此时将start位置更改为map.get(char)的下一个元素，
    // 更新之后start变为map.get(char)+1
    if (map.has(char) && map.get(char) >= start) start = map.get(char) + 1
    // 无论是否发现元素，都要设置
    map.set(char, i)
    // 用之前的maxLen与现在字串长度（i-start+1）比较，更新长度
    maxLen = Math.max(maxLen, i - start + 1)
  }
  return maxLen
}

//最长回文子串
const longestPalindrome = s => {
  if (!s || s.length < 2) return s
  // maxLen：最长回文子串的长度，默认为1，因为只取一个元素时，必然是回文串
  // start：最长回文串的起始位置
  let maxLen = 1, start = 0
  const len = s.length
  const expand = (left, right) => {
    while (left >= 0 && right < len && s[left] === s[right]) {
      const currentLen = right - left + 1
      if (currentLen > maxLen) {
        maxLen = currentLen
        start = left
      }
      left--
      right++
    }
  }
  // 最长回文子串可能是奇数长度，也可能是偶数长度，所以分别计算一遍
  for (let i = 0; i < len; i++) {
    // 从一个元素开始扩展，计算奇数长度的
    expand(i, i)
    // 从两个元素开始扩展，计算偶数长度的
    expand(i, i + 1)
  }
  /**
   * substring：接收两个参数，分别是起始索引和结束索引
   * substr：接收两个参数，分别是起始索引和截取长度
   */
  return s.substring(start, start + maxLen)
}

//盛水最多的容器
const maxArea = height => {
  // maxArea：能盛水的面积
  let left = 0, right = height.length - 1, maxArea = 0
  // 使用双指针法从两端向中间逐步靠拢
  // 这里不用考虑left等于right，只有当height只有一个元素时需要考虑等于，但题目说明至少2条线
  while (left < right) {
    const currentArea = Math.min(height[left], height[right]) * (right - left)
    maxArea = Math.max(maxArea, currentArea)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return maxArea
}

//三数之和
const threeSum = nums => {
  nums.sort((a, b) => a - b)
  const res = [], len = nums.length
  // 注意循环边界，这里i的终止边界是len-2，因为
  // 这个算法的思想就是遍历i，在遍历过程中固定住i，然后将问题转换为
  // 两数之和，所以必须确保再i终止时，右侧还有两个元素可以进行求解两数之和，所以i的终止条件就是len-2
  for (let i = 0; i < len - 2; i++) {
    let left = i + 1, right = len - 1
    // 如果遇到相同的数字，直接跳过
    if (i > 0 && nums[i - 1] === nums[i]) continue
    while (left < right) {
      // 在while中，i是固定的，因此处理left，right就可以了
      if (nums[i] + nums[left] + nums[right] < 0) {
        // 如果和小于0，那么说明元素不够大，做指针向右移动
        left++
        // 左指针移动过程中，依然需要跳过相同的元素
        while (left < right && nums[left - 1] === nums[left]) {
          left++
        }
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--
        // 注意right进行相同元素检查时，和left的索引不同
        // 因为上方执行了right--，所以right已经变为当前right的左边元素了，所以需要用nums[right-1]与nums[right]做对比
        while (left < right && nums[right] === right[right + 1]) {
          right--
        }
      } else {
        // 将结果放入res中，并且左右指针一并前进
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        // 左右指针在前进过程中，如果遇到重复的元素，依然要跳过
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

//删除链表的倒数第n个节点
const removeNthFromEnd = (head, n) => {
  // 定义一个dummy节点，用于处理删除头结点的情况
  const dummy = new ListNode(0)
  dummy.next = head
  // 使用快慢指针
  let slow = dummy, fast = dummy
  // 快指针先向前移动n+1步，这样快慢指针之间就有n个节点的间隔
  for (let i = 0; i <= n; i++) fast = fast.next
  // 此时，fast指向最后一个节点的下一个节点，其实就是空节点，而slow因为与fast之间有n个节点的间隔，所以slow指向的是倒数第n个节点的前一个节点
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  // 此时，slow指向待删除节点的前一个节点，slow.next就是待删除的节点，直接丢弃该节点即可
  slow.next = slow.next.next
  // dummy.next就是链表的头节点，按照惯例，返回头结点
  return dummy.next
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

//下一个排列
const nextPermutation = nums => {
}

//搜索旋转排序数组
const search = (nums, target) => {
  const len = nums.length
  let left = 0, right = len - 1
  // 考虑等于是针对nums中只有一个元素的情况
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) return mid
    // 如果数组没有进行旋转，直接就是二分法
    // 由于要求logn的时间，考虑到旋转后的两个子数组其实是排序数组，所以针对两个子数组分别进行二分法
    if (nums[left] <= nums[mid]) {
      // nums[left]<nums[mid]，说明左半段是递增的
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      // 否则，就说明mid右边这一段是递增的
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}

// todo:细节需要进一步掌握
//在排序数组中查找元素的第一个和最后一个位置
const searchRange = (nums, target) => {
  // lower：控制是否查询的是第一个出现的位置，为false则代表查找元素出现的最后一个位置
  const binarySearch = (nums, target, lower) => {
    const len = nums.length
    let left = 0, right = len - 1, ans = nums.length
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (nums[mid] > target || (lower && nums[mid] >= target)) {
        right = mid - 1
        ans = mid
      } else {
        left = mid + 1
      }
    }
    return ans
  }
  let ans = [-1, -1]
  const leftIndex = binarySearch(nums, target, true)
  const rightIndex = binarySearch(nums, target, false) - 1
  if (leftIndex <= rightIndex && rightIndex < nums.length && nums[leftIndex] === target && nums[rightIndex] === target) {
    ans = [leftIndex, rightIndex]
  }
  return ans
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

// 旋转图像
/**
 * @param matrix
 * 矩阵顺序旋转90度，可以使用两步实现：
 * 先按照主对角线进行翻转
 * 再进行水平翻转，也就是水平的镜像翻转
 */
const rotate = matrix => {
  const len = matrix.length
  // 旋转主对角线
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  // 水平翻转
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len / 2; j++) {
      [matrix[i][j], matrix[i][len - 1 - j]] = [matrix[i][len - 1 - j], matrix[i][j]]
    }
  }
}

// 字母异位词分组
const groupAnagrams = strs => {
  // 创建map，存储分组之后的异位词
  const anagramsMap = new Map()
  // 遍历整个字符串数组
  for (let str of strs) {
    // 对当前遍历字符串进行排序
    const sortedStr = str.split('').sort().join('')
    if (!anagramsMap.has(sortedStr)) {
      // 如果没有的话就在map中新建key/value
      anagramsMap.set(sortedStr, [str])
    } else {
      // 如果已经存在的话，就直接在后面追加
      const anagramGroup = anagramsMap.get(sortedStr)
      anagramGroup.push(str)
      anagramsMap.set(sortedStr, anagramGroup)
    }
  }
  // 将map转换成数组
  // todo：注意将map转换为数组的方式
  return Array.from(anagramsMap.values())
}

// 最大子数组和
const maxSubArray = nums => {
  // maxSumRes：最终需要计算的子数组和
  // maxSumCurrent：计算过程中的子数组和
  // 刚开始的时候都认为是数组的第一个元素
  let maxSumRes = nums[0], maxSumCurrent = nums[0]
  const len = nums.length
  for (let i = 1; i < len; i++) {
    // 对于每个元素，判断当前正在遍历的元素与该元素加上前置数组的和的大小关系
    // 如果nums[i]>maxSumCurrent + nums[i]，说明要从nums[i]重新开始截取子数组
    // 如果nums[i]<=maxSumCurrent + nums[i]，说明nums[i]这个元素是需要追加到数组中去的
    maxSumCurrent = Math.max(nums[i], maxSumCurrent + nums[i])
    // 更新maxSumRes
    maxSumRes = Math.max(maxSumRes, maxSumCurrent)
  }
  return maxSumRes
}

// 跳跃游戏
const canJump = nums => {
  const len = nums.length
  // lastGoodIndex：我们从数组的最后一个元素开始遍历，目标是找到一个“好”的索引（lastGoodIndex）。"好"的索引是指从该位置出发，可以到达最后一个索引的位置。
  let lastGoodIndex = len - 1
  for (let i = len - 1; i >= 0; i--) {
    // 对于索引i，如果在索引i的位置上，能够跳跃到lastGoodIndex，那么说明当前i是满足要求的，将lastGoodIndex向左侧推进，并更新变量值
    if (i + nums[i] >= lastGoodIndex) lastGoodIndex = i
  }
  // 遍历结束之后，看看lastGoodIndex是否被迭代回到索引为0的位置，如果是，说明可以从第一个元素跳跃到最后一个元素
  return lastGoodIndex === 0
}

// 合并区间
const mergeIntervals = intervals => {
  const len = intervals.length
  // 如果不超过一个区间，则不需要合并，直接返回就行
  if (len <= 1) {
    return intervals
  }
  // 对区间进行排序，按照区间的起点进行排序
  intervals.sort((a, b) => a[0] - b[0])
  // 初始化时就是第一个区间
  const res = [intervals[0]]
  for (let i = 1; i < len; i++) {
    // 如果当前区间的起点intervals[i][0小于等于上一个区间的终点res[res.length - 1][1]，说明两个区间有重叠，需要合并
    if (intervals[i][0] <= res[res.length - 1][1]) {
      // 合并区间的终点为两个区间终点的最大值
      res[res.length - 1][1] = Math.max(intervals[i][1], res[res.length - 1][1])
    } else {
      // 否则，说明两个区间没有重叠，直接将当前区间加入到res中
      res.push(intervals[i])
    }
  }
  return res
}

// 不同路径
/**
 * @param m
 * @param n
 * @returns {any}
 * 这一题也能使用回溯算法解决，但是回溯算法的时间复杂度会更差
 */
const uniquePaths = (m, n) => {
  // base case
  // 创建一个m*n的二维数组，用于存储到达每个位置的路径数，默认全部初始化为0
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 初始化第一行和第一列的路径数，因为只能向右或者向下移动，所以第一行和第一列的路径数都是1
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1
  }

  // 开始穷举：这里是动态规划的核心过程，注意练习如何写出动态规划的状态转移方程
  // 从第二行第二列开始遍历，计算每个方格对应的路径数量
  // i：从第二行开始遍历
  // j：从第二列开始遍历
  for (let i = 1; i < m; i++) {
    for (j = 1; j < n; j++) {
      // 每一个方格的路径数量等于从上面的格子到达该方格的路径数量加上从左边的格子到达该方格的路径数量
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
    }
  }
  return dp[m - 1][n - 1]
}

// 不同路径2
const uniquePathsWithObstacles = grid => {
  const m = grid.length, n = grid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  /**
   * 在初始化第一行和第一列时，考虑到只能往下移动或者往右移动，
   * 那么在第一行以及第一列中只要遇到一个障碍，那么这个障碍后面都是不可到达的，就可以直接break
   */
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 0) {
      dp[i][0] = 1
    } else {
      break
    }
  }
  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 0) {
      dp[0][j] = 1
    } else {
      break
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (grid[i][j] === 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
}

// 最小路径和
const minPathSum = grid => {
  // m：grid行数
  // n：grid列数
  const m = grid.length, n = grid[0].length
  // 创建一个m*n的二维数组，用于存储到达每个位置的最小路径和，默认全部初始化为0
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 初始化第一行和第一列的最小路径和
  dp[0][0] = grid[0][0]
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }
  // 从第二行第二列开始遍历，计算每个方格对应的最小路径和
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[m - 1][n - 1]
}

// 编辑距离
const minDistance = (word1, word2) => {
  const len1 = word1.length, len2 = word2.length, map = new Map()
  const dp = (i, j) => {
    if (i === -1) return j + 1
    if (j === -1) return i + 1
    if (map.get([i, j])) return map.get([i, j])
    if (word1[i] === word2[j]) {
      map.set([i, j], dp(i - 1, j - 1))
    } else {
      map.set([i, j], Math.min(dp(i, j - 1) + 1, dp(i - 1, j) + 1, dp(i - 1, j - 1) + 1))
    }
    return map.get([i, j])
  }
  return dp(len1 - 1, len2 - 1)
}

console.log(minDistance('horse', 'ros'))

// 颜色分类
/**
 * @param nums
 * 算法思想：遍历过程中将0移动到数组的最前面，将2移动到数组的最后面
 * 遍历结束之后，自然中间的部分就是1
 */
const sortColors = nums => {
  const len = nums.length
  // left：指向数组排序之后的最后一个0
  // right：指向数组排序之后的第一个2
  // current：遍历过程中的指针，从0开始遍历
  let left = 0, right = len - 1, current = 0
  // 等于的情况也要考虑，最后一个元素nums[right]也是需要判断的
  while (current <= right) {
    if (nums[current] === 0) {
      // 如果当前元素是0，那么就将其与left指向的元素交换位置
      [nums[left], nums[current]] = [nums[current], nums[left]]
      // 交换之后，left指向的元素已经是0了，所以left向右移动一位
      // 交换之后，current的位置已经是0了，所以current向右移动一位
      left++
      current++
    } else if (nums[current] === 2) {
      // 如果当前元素是2，那么就将其与right指向的元素交换位置
      [nums[current], nums[right]] = [nums[right], nums[current]]
      // 交换之后，right指向的元素已经是2了，所以right向左移动一位
      // 这里current并不需要移动，因为交换之后，current指向的元素还没有被遍历过，所以需要再次判断
      right--
    } else {
      // 如果当前元素是1，那么就不需要交换，直接向右移动一位
      current++
    }
  }
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

// 单词搜索
const exist = (board, word) => {
}

// 不同的二叉搜索树
const numTrees = n => {
  if (n === 0 || n === 1) return 1
  // 之所以长度为n+1,是因为要计算从0到n个元素的情况
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  // 随着元素逐渐增多，二叉树的数量也在变化，所以外层循环是从2到n（0，1已经处理过了）
  for (let i = 2; i <= n; i++) {
    // 在循环过程中，从1到i的每一个元素，都可以作为根节点，所以内层循环是从1到i
    for (let j = 1; j <= i; j++) {
      // 左子树和右子树是相互独立的，所以组合的结果是乘积
      // dp[j-1]：左子树的数量
      // dp[i-j]：右子树的数量
      // j-1,i-j加起来正好是i-1，就是去掉根节点的数量
      /**
       * @type {number}
       * 内层循环中，外层循环的每一个元素都有机会充当根节点，所以内层循环范围就是[1,i]
       * 在循环中，左子树的节点数量是j-1，所以右子树的节点数量就是(i-1)-(j-1)=i-j
       * 由于二叉树的层层递进的关系，因此dp[i]+=左子树数量*右子树数量
       */
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}

// 验证二叉搜索树
const isValidBST = root => {
  // 定义辅助的递归方法来进行判断
  const helper = (node, lower, upper) => {
    if (!node) return true
    // 对于第一次进入循环的根节点，lower是最小安全值，upper是最大安全值，检查根节点是否在安全值范围内
    // 对于后续的子节点，lower和upper的值会不断更新，因为左子节点的值必须小于父节点，而右子节点的值必须大于父节点
    if (node.val <= lower || node.val >= upper) return false
    return helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
  }
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
}

// 二叉树的层序遍历
const levelOrder = root => {
  // 如果根节点为空，直接返回空数组
  if (!root) return []
  // res：最终的遍历结果
  // queue：用于存储在下一轮遍历时需要遍历的节点，在开始遍历之前，初始化为[root]
  const res = [], queue = [root]
  /**
   * 核心思想：while用于遍历level，for循环用于遍历每个level从左到右的全部节点
   */
  while (queue.length) {
    const levelSize = queue.length
    const currentLevel = []
    for (let i = 0; i < levelSize; i++) {
      // 将当前这一层的节点全部取出来，放入到currentLevel中
      const node = queue.shift()
      currentLevel.push(node.val)
      // 对于当前遍历的每一个节点，都要判断是不是有左右子节点，有的话，就放入到queue中，用于下一轮遍历
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(currentLevel)
  }
  return res
}

// 从前序和中序遍历序列构造二叉树
const buildTree = (preorder, inorder) => {
  // 只要其中任意一个遍历为空，说明没有元素，无法构建，直接返回null
  if (!preorder.length || !inorder.length) return null
  // 前序遍历的第一个元素就是根节点，借此创建树的根节点
  const rootValue = preorder[0], root = new TreeNode(rootValue)
  // 在中序遍历中找到根节点的位置，根节点左边的元素都是左子树的元素，根节点右边的元素都是右子树的元素
  const rootIndex = inorder.indexOf(rootValue)
  // 构建左子树：前序遍历中，根节点之后的rootIndex个元素就是左子树的元素，中序遍历中，根节点左边的全部元素就是左子树的元素
  root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex))
  // 构建右子树：前序遍历中，根节点之后跳跃rootIndex个元素开始，才是右子树的元素，中序遍历中，根节点右边的全部元素就是右子树的元素
  root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1))
  // 返回树的根节点
  return root
}

// 二叉树展开为链表
const flatten = root => {
  // 如果根节点都不存在，那么直接return
  if (!root) return
  // 递归左右子树
  flatten(root.left)
  flatten(root.right)
  // 最终的链表其实就是基于右子树来改造实现的，所以保留右子树的引用
  const rightSubtree = root.right
  // 将左子树挂载到根节点的原始右子树的位置，替换了原来的右子树，然后左子树就不需要了，清空左子树
  root.right = root.left
  root.left = null
  /*
  * 二叉树有个特点，就是左子树是排序的并且小于等于中间节点，中间节点小于等于右子树，右子树也是排序的
  * */
  let currentNode = root
  while (currentNode.right) {
    currentNode = currentNode.right
  }
  // 将之前记录下来的右子树，直接拼接在新的右子树的后面，这样就是一个按顺序的链表了
  currentNode.right = rightSubtree
}

// 最长连续序列
const longestConsecutive = nums => {
  if (!nums.length) return 0
  // 将元素转为set，实现元素的唯一性
  const set = new Set(nums)
  // res：最终返回的结果
  let res = 0
  for (let item of set) {
    // 如果item-1，即前一个自然数在set中不存在，说明这个item就是一个连续序列的起始数字
    if (!set.has(item - 1)) {
      // currentNum:记录连续序列的起始数字
      // currentLength：记录连续序列的长度，初始值为1
      let currentNum = item, currentLength = 1
      // 以currentNum为起始继续向后递增，判断set中是否包含后续的连续元素
      while (set.has(currentNum + 1)) {
        currentNum += 1
        currentLength += 1
      }
      // 在寻找完一个连续子序列之后，就与之前找到的连续序列的长度进行比较，如果找到的长度更长，就更新res
      res = Math.max(res, currentLength)
    }
  }
  return res
}

// 单词拆分
// todo：这道题再研究研究
const wordBreak = (s, wordDict) => {
  const len = s.length, wordSet = new Set(wordDict)
  // 这里数组的长度是len+1，其中第一个元素代表s为空串时是否能拆分，故dp[0]=true
  const dp = new Array(len + 1).fill(false)
  dp[0] = true
  // 对长度为len的单词s进行遍历
  for (let i = 1; i <= len; i++) {
    // 对每一个i，都要从0开始检索是不是可以拆分
    for (let j = 0; j < i; j++) {
      const word = s.slice(j, i)
      if (dp[j] && wordSet.has(word)) {
        dp[i] = true
        break
      }
    }
  }
  return dp[len]
}

// 环形链表2：寻找环的入口
const detectCycle = head => {
  // 如果链表为空或者只有一个节点，那么不可能存在环形链表，直接返回null代表不存在这个环的入口节点
  if (!head || !head.next) return null
  // 使用快慢指针
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    // 如果快慢指针相遇，说明存在环
    if (slow === fast) {
      // 注意下面的逻辑，将slow重置为head，然后快慢指针同向单步移动，最终的交点就是环的入口
      slow = head
      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }
      return slow
    }
  }
  return null
}

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

// 排序链表
const sortList = head => {

}

// 最大乘积子数组
const maxProduct = nums => {
  const len = nums.length
  // 如果数组的长度为0，则直接返回0
  if (!len) return 0
  // maxSoFar
  // minSoFar
  // res
  let maxSoFar = nums[0], minSoFar = nums[0], res = nums[0]
  for (let i = 1; i < len; i++) {
    // 这里需要记录maxSoFar，因为在下面的迭代过程中，maxSoFar会被重写
    const current = nums[i], tempMax = maxSoFar
    // 需要记录最大乘积以及最小乘积，因为最小乘积若为负数，那么乘以另外一个负数有可能成为最大值
    maxSoFar = Math.max(current, current * maxSoFar, current * minSoFar)
    minSoFar = Math.min(current, current * tempMax, current * minSoFar)
    res = Math.max(res, maxSoFar)
  }
  return res
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

// 打家劫舍
const rob = nums => {
  const len = nums.length
  // 长度为0，直接返回0
  if (!len) return 0
  const dp = new Array(len)
  // 动态规划数组的第一项，代表数组长度为1时的收益，所以就是nums[0]
  dp[0] = nums[0]
  // 动态规划数组的第二项，代表数组长度为2时的收益，因为不能连续两家，所以只能是其中一个
  dp[1] = Math.max(nums[0], nums[1])
  // 剩余的开始迭代，长度为i+1时，收益有两种情况，要么偷了前面一家当前不偷，或者偷了前面倒数第二家，然后也偷了当前这家，取二者的较大值
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  // 返回最后一个元素即可
  return dp[len - 1]
}

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

//删除有序数组中的重复项2
var removeDuplicates = function (nums) {
  const len = nums.length
  let count = 0
  if (len < 3) return len
  for (let i = 0; i < len - 2 - count; i++) {
    if (nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2]) {
      nums.splice(i, 1)
      count++
      i--
    }
  }
  return len - count
};

//轮转数组
var rotate = function (nums, k) {
  const len = nums.length
  k = k % len
  nums.unshift(...nums.splice(-k))
};

//买卖股票的最佳时机2
// 采用贪心算法的策略，只要当天的价格比前一天的价格高，那么就在昨天买入，今天卖出，这样就能获得最大的利润
var maxProfit = function (prices) {
  let max = 0
  const len = prices.length
  for (let i = 1; i < len; i++) {
    if (prices[i] > prices[i - 1]) max += prices[i] - prices[i - 1]
  }
  return max
};

var longestCommonPrefix = function (strs) {
  if (!strs || !strs.length) return ''
  const len = strs[0].length
  for (let i = 0; i < len; i++) {
    const char = strs[0][i]
    for (let j = 1; j < strs.length; j++) {
      /**
       * 注意这个：
       * 如果循环中发现某个字符串的长度已经到顶了，那么说明这个字符串就是最长公共前缀
       * 或者有某个字符串的字符不等于第一个字符串的字符，那么说明出现了不等于的情况，这个时候也该返回数据了
       */
      if (strs[j].length === i || strs[j][i] !== char) {
        return strs[0].substring(0, i)
      }
    }
  }
  return strs[0]
};

//最后一个单词的长度
var lengthOfLastWord = function (str) {
  str = str.trim()
  const len = str.length
  let res = 0
  for (let i = len - 1; i >= 0; i--) {
    if (str[i] === ' ') break
    res++
  }
  return res
};

//反转字符串中的单词
var reverseWords = function (str) {
  /**
   * @type {string[]}
   * 不要使用split(' ')，这种只能匹配到一个空格，正则/\s+/可以匹配到一个或者多个空格，这样才符合题目的要求
   */
  const list = str.trim().split(/\s+/)
  return list.reverse().join(' ')
};

// 两数之和2--输入有序数组
var twoSum = function (numbers, target) {
  const len = numbers.length
  let left = 0, right = len - 1
  while (left < right) {
    if (numbers[left] + numbers[right] > target) {
      right--
    } else if (numbers[left] + numbers[right] < target) {
      left++
    } else {
      return [left + 1, right + 1]
    }
  }
};

// 跳跃游戏2
var jump = function (nums) {
  const len = nums.length
  /**
   * 数组长度为0或者1，不用跳，直接返回0即可
   */
  if (len < 2) return 0
  /**
   * @type {number}
   * 开始循环，for循环的边界是小于len-1，因为需要执行跳跃操作，所以最多只需要循环到倒数第二个元素上
   * maxReach:当前位置所能跳到的最远位置
   * end:索引为i-1的元素所能到达的最远位置，就是上一个元素所能到达的最远位置
   */
  let step = 0, maxReach = 0, end = 0
  for (let i = 0; i < len - 1; i++) {
    // 更新当前元素能达到的最远的位置
    maxReach = Math.max(maxReach, i + nums[i])
    // 如果i===end，说明当前这个位置，就是上一个元素所能到达的最远位置，所以要更新一下end，这个时候的end就是现在这个元素所能到达的最远位置
    // 同时，步数要加1
    // 如果更新之后的maxReach大于等于数组长度，说明走完了，直接返回步数即可，不用再往后走了x
    if (i === end) {
      step++
      end = maxReach
      if (maxReach >= len - 1) return step
    }
  }
};

//H指数
var hIndex = function (citations) {
  // 先将数组按照从高到低的顺序进行排序
  citations.sort((a, b) => b - a)
  const len = citations.length
  // 初始化h指数为0
  let h = 0
  for (let i = 0; i < len; i++) {
    /**
     * i代表当前在循环第几篇论文，
     * 因为数组是降序排列，所以如果满足citations[i] > i这个条件，那么从0到i这i+1篇论文的引用次数至少都是i+1,所以此时将h更新为i+1
     * 如果当前元素citations[i]已经不满足这个要求了，那么后续元素更小则更不会满足这个要求，说明已经找到了h指数的最大值，直接break结束循环即可
     */
    if (citations[i] > i) {
      h = i + 1
    } else {
      break
    }
  }
  return h
};

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

//长度最小的子数组：滑动窗口算法，时间复杂度是O(n)
var minSubArrayLen = function (target, nums) {
  const len = nums.length
  /**
   * @type {number}
   * 先将最小长度设置为一个极限
   */
  let minLength = Infinity, left = 0, sum = 0
  /**
   * 使用滑动窗口开始逼近
   */
  for (let right = 0; right < len; right++) {
    sum += nums[right]
    while (sum >= target) {
      /**
       * @type {number}
       * 当sum已经符合条件之后，即sum大于等于target之后，就要开更新窗口长度了，在这个过程中，需要不断更新minLength
       */
      minLength = Math.min(minLength, right - left + 1)
      sum -= nums[left]
      left++
    }
  }
  return minLength === Infinity ? 0 : minLength
};

// 分隔链表：注意每次循环之后要将当前的元素从链表中清除
var partition = function (head, x) {
  /*
  * 思路：创建两个新的链表，然后遍历题目中给出的链表，小于的放在其中一个链表，
  * 大于的放在另外一个链表，最后合并两个链表
  * */
  const dummy1 = new ListNode(-1)
  const dummy2 = new ListNode(-1)
  let current1 = dummy1, current2 = dummy2
  let current = head
  while (current) {
    if (current.val >= x) {
      current2.next = current
      current2 = current2.next
    } else {
      current1.next = current
      current1 = current1.next
    }
    /*
    * 这里比较关键：每次循环一个元素，都要将这个元素从题目所给的链表中清除，否则容易造成环形链表
    * */
    const temp = current.next;
    current.next = null;
    current = temp
  }
  current1.next = dummy2.next
  return dummy1.next
};

// 7 整数反转
const reverse = x => {
  const flag = x < 0 ? -1 : 1
  const temp = flag < 0 ? x.toString().slice(1) : x.toString()
  const res = flag < 0 ? Number(temp.split('').reverse().join('')) * -1 : Number(temp.split('').reverse().join(''))
  return (res >= -Math.pow(2, 31) && res <= Math.pow(2, 31) - 1) ? res : 0
};

// 36 有效数独
const isValidSudoku = board => {
  const rows = Array.from({length: 9}, () => new Set())
  const columns = Array.from({length: 9}, () => new Set())
  const boxes = Array.from({length: 9}, () => new Set())
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const currentNumber = board[i][j]
      //  如果是空白格，直接跳过
      if (currentNumber === '.') continue

      // 检查行
      // 如果当前这一行rows[i]中已经包含了当前循环的这个元素currentNumber，那么直接返回false
      if (rows[i].has(currentNumber)) return false
      // 如果当前这一行rows[i]中没有包含这个元素，那么就添加进去
      rows[i].add(currentNumber)

      // 检查列
      // 如果当前这一列columns[j]中已经包含了当前循环的元素，直接返回false
      if (columns[j].has(currentNumber)) return false
      // 否则就添加进去
      columns[j].add(currentNumber)

      // 检查子数组
      /**
       * @type {number}
       * 注意这个计算子数独索引的方式
       * 整个数独按照从左到右，从上到下的方式，一共会被划分为9个子数独，索引分别为0-8
       * 计算当前这个小格子处于哪一个子数独可以用Math.floor(i / 3) * 3 + Math.floor(j / 3)计算得到
       */
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      if (boxes[boxIndex].has(currentNumber)) return false
      boxes[boxIndex].add(currentNumber)
    }
  }
  return true
};

// 165 版本号对比
/**
 * @param version1
 * @param version2
 * @returns {number}
 * 将两个版本号转换为数组，然后逐个进行对比，有不一致的立刻返回-1
 */
const compareVersion = (version1, version2) => {
  const version1Arr = version1.split('.'), version2Arr = version2.split('.')
  const version1Len = version1Arr.length, version2Len = version2Arr.length
  let index = 0
  while (index < version1Arr.length || index < version2Arr.length) {
    const x = version1Arr[index] ? +version1Arr[index] : 0
    const y = version2Arr[index] ? +version2Arr[index] : 0
    if (x < y) {
      return -1
    } else if (x > y) {
      return 1
    } else {
      index++
    }
  }
  return 0
};

// 8 字符串转换整数
const myAtoi = s => {
  // 注意这个parseInt的使用
  const number = parseInt(s, 10)
  if (isNaN(number)) {
    return 0
  } else if (number < -(2 ** 31) || number > 2 ** 31 - 1) {
    return number < -(2 ** 31) ? -(2 ** 31) : 2 ** 31 - 1
  } else {
    return number
  }
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

// 54 螺旋数组
/**
 * @param matrix
 * @returns {*[]}
 * 按照从左到右，从上到下，从右到左，从下到上的顺序进行循环
 * 请注意，在每一轮while中，matrix的length都在不断变化
 * 时间复杂度：O(m*n)：一共需要遍历的元素就是整个矩阵中的元素，也就是m*n
 */
const spiralOrder = matrix => {
  const res = []
  while (matrix.length > 0) {
    /**
     * 从左到右
     */
    res.push(...matrix.shift())
    /**
     * 从上到下
     */
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i].length > 0) res.push(matrix[i].pop())
    }
    /**
     * 从右向左
     */
    if (matrix.length > 0) res.push(...matrix.pop().reverse())
    /**
     * 从下到上
     */
    for (let i = matrix.length - 1; i >= 0; i--) {
      if (matrix[i].length > 0) res.push(matrix[i].shift())
    }
  }
  return res
};