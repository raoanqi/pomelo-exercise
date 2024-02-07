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
}

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

// 162 寻找峰值
/**
 * @param nums
 * @returns {number}
 * 时间复杂度：O(logn)
 */
const findPeakElement = nums => {
  // 初始化二分查找的左右指针
  let left = 0, right = nums.length - 1
  // 左右指针在循环过程中不断向中间移动，相遇时返回left或者right就是找到的峰值
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    /**
     * 如果nums[mid]<nums[mid+1]，说明峰值在mid右边，所以left更新为mid+1
     * 如果nums[mid]>nums[mid+1]，说明峰值在mid本身或者mid左边，所以right更新为mid
     * 如果nums[mid]=nums[mid+1]，则无法判断，这个时候其实往两边搜索都可以
     */
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else if (nums[mid] > nums[mid + 1]) {
      right = mid
    } else {
      /**
       * @type {number}
       * 此时为nums[mid]=nums[mid+1]，往两边搜索都可以
       * 如果往右边搜索，那么峰值肯定出现在mid右边，所以更新left为mid+1
       * 如果往左边搜索，那么峰值肯定出现在mid左边，所以更新right为mid-1
       * 这两种都可以
       */
      // left = mid + 1
      right = mid - 1
    }
  }
  return left
};

// 42 接雨水
// todo：需要进一步解析
const trap = height => {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, res = 0
  while (left < right) {
    leftMax = Math.max(leftMax, height[left])
    rightMax = Math.max(rightMax, height[right])
    if (leftMax < rightMax) {
      res += leftMax - height[left]
      left++
    } else {
      res += rightMax - height[right]
      right--
    }
  }
  return res
};

/**
 * 前缀和数组类型题目
 */
// 303 区域和检索，这是一道一维数组前缀和
/**
 * @param nums
 * @constructor
 * 先计算前缀和，然后快速求和
 * 时间复杂度O(n)
 */
var NumArray = function (nums) {
  const len = nums.length
  this.preSum = new Array(len + 1)
  this.preSum[0] = 0
  for (let i = 1; i <= len; i++) {
    this.preSum[i] = this.preSum[i - 1] + nums[i - 1]
  }
};

NumArray.prototype.sumRange = function (left, right) {
  return this.preSum[right + 1] - this.preSum[left]
};

// 304 二维区域和检索，这是一道二维数组前缀和
/**
 * @param matrix
 * @constructor
 * 时间复杂度O(mn)，mn分别为矩阵的行数和列数
 */
var NumMatrix = function (matrix) {
  const m = matrix.length, n = matrix[0].length
  this.preSum = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      this.preSum[i][j] = this.preSum[i - 1][j] + this.preSum[i][j - 1] + matrix[i - 1][j - 1] - this.preSum[i - 1][j - 1]
    }
  }
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return this.preSum[row2 + 1][col2 + 1] - this.preSum[row1][col2 + 1] - this.preSum[row2 + 1][col1] + this.preSum[row1][col1]
};

/**
 * 差分数组类型题目
 */
// 1094 拼车
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 * 时间复杂度O(n)，n为trips的长度
 */
var carPooling = function (trips, capacity) {
  // 构建差分数组
  const diff = new Array(1001).fill(0)
  for (const [num, from, to] of trips) {
    diff[from] += num
    diff[to] -= num
  }
  // 使用循环，模拟车辆循环过程中上下客，如果中途超过了capacity容量，就直接返回false
  let temp = 0
  for (const item of diff) {
    temp += item
    if (temp > capacity) return false
  }
  // 如果循环顺利结束，就代表全程不会超载，返回true
  return true
};

// 1109 航班预定统计
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 * 时间复杂度：O(m+n)，其中m是bookings的长度，另外n是后面遍历构建结果res的时间复杂度
 */
var corpFlightBookings = function (bookings, n) {
  // 构建差分数组
  const diff = new Array(n + 1).fill(0)
  for (const [first, last, seat] of bookings) {
    diff[first - 1] += seat
    diff[last] -= seat
  }
  const res = []
  let temp = 0
  for (let i = 0; i < n; i++) {
    temp += diff[i]
    res[i] = temp
  }
  return res
};



