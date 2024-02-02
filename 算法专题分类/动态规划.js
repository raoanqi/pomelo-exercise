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

