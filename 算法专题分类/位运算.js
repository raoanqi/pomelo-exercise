//只出现一次的数字
// 时间复杂度O(n)
// 空间复杂度O(1)
const singleNumber = nums => {
  const len = nums.length
  let res = 0
  for (let i = 0; i < len; i++) {
    res ^= nums[i]
  }
  return res
}

//比特位计数
/**
 * @param n
 * 如果 x 是偶数：bits[x] = bits[x / 2]。
 * 如果 x 是奇数：bits[x] = bits[x /2 ] + 1。
 *
 */
const countBits = n => {
  const res = [0]
  for (let i = 1; i <= n; i++) {
    // res[i>>2]是i除以2然后取整的数所对应的1的个数，如果是偶数这就是结果
    // 如果是奇数，因为最后一位是1，所以会多一个
    res[i] = res[i >> 1] + (i & 1)
  }
  return res
}

//汉明距离
//使用异或运算：两个数异或，结果中1的个数就是汉明距离
// number & number-1可以实现清除最右边的1
const hammingDistance = (x, y) => {
  let xorRes = x ^ y,
    count = 0
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
    n = n & (n - 1)
    res++
  }
  return res
}

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
}
