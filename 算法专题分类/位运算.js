//只出现一次的数字
const singleNumber = nums => {
  const len = nums.length
  let res = 0
  for (let i = 0; i < len; i++) {
    res ^= nums[i]
  }
  return res
}

//比特位计数
const countBits = n => {
  const count = num => {
    let count = 0
    while (num !== 0) {
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

// 191 位1的个数
const hammingWeight = n => {
  let res = 0
  while (n !== 0) {
    n = n & n - 1
    res++
  }
  return res
};

// 190 颠倒二进制位
/**
 * @param n
 * @returns {number}
 * 时间复杂度：一共需要循环32次，是固定的，所以是常数时间复杂度，O(1)
 */
const reverseBits = n => {
  // 准备一个res
  let res = 0
  // 进行32次循环移动
  for (let i = 0; i < 32; i++) {
    // 将res左移一位，右侧第一个位置就空出来了
    res = res << 1
    // n&1获取到n的最后一位，然后res|(n&1)是为了将n的右侧第一位填充到res的最后一位上
    res = res | (n & 1)
    // n的最后一位填充到res的最后一位之后，需要把n右移，供下一轮循环使用
    n = n >> 1
  }
  // 最后使用无符号右移，确保结果是一个32位的无符号整数
  return res >>> 0
};