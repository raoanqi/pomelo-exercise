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

// 73 矩阵置零
/**
 * @param matrix
 * 时间复杂度：O(m*n)
 * 空间复杂度：O(m+n)
 */
const setZeroes = matrix => {
  const m = matrix.length, n = matrix[0].length
  // 分别创建两个数组，长度为m，n，初始化时全部填充0
  const rows = new Array(m).fill(0)
  const cols = new Array(n).fill(0)
  // 遍历整个矩阵，遇到为0的元素，就将上述数组中对应的数字置为1
  // rows[i]为1代表矩阵的第i行都应该置零
  // cols[j]为1代表矩阵的第j列都应该置零
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = 1
        cols[j] = 1
      }
    }
  }
  // 重新遍历一遍矩阵，开始置零
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果中间遇到rows[i]或者cols[j]为0的，那么就说明当前matrix[i][j]元素处于需要置零的行或者列上，因此进行置零
      if (rows[i] === 1 || cols[j] === 1) {
        matrix[i][j] = 0
      }
    }
  }
};


