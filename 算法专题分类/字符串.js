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

// 344 反转字符串
const reverseString = s => {
  const len = s.length
  if (len === 1) return s
  for (let i = 0; i < Math.floor(len / 2); i++) {
    [s[i], s[len - 1 - i]] = [s[len - 1 - i], s[i]]
  }
  return s
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

// 最长公共前缀
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

// 91 解码方法
/**
 * @param s
 * @returns {any}
 * 时间复杂度：O(n)，n为字符串的长度
 */
const numDecodings = s => {
  // 使用动态规划解决，循环过程中后续的解码方案数量需要根据前面子串的解码方案数量逐步叠加
  // 初始化一个长度为len+1的数组，填充满0，之所以加1是因为要考虑空字符串的情况
  const len = s.length, dp = new Array(len + 1).fill(0)
  // dp[0]代表空字符串的情况，此时只有一种解码方案，就是解码为空串
  dp[0] = 1
  for (let i = 1; i <= len; i++) {
    /**
     * 如果s[i]的前面一个元素s[i-1]不是0，说明s[i-1]是可以单独进行解码的
     * 如果s[i-1]是0，那么s[i-1]就需要和s[i-2]合并在一起进行解码
     * 所以这里先考虑s[i-1]不是0的情况
     * 先把s[i-1]的解码方案加上去
     */
    if (s[i - 1] !== '0') dp[i] += dp[i - 1]
    /**
     * 上面判断了s[i-1]不是0，可以单独进行解码的情况
     * 接下来需要考虑s[i-1]是否可以和s[i-2]合并进行解码的情况
     * 首先要在i大于1的位置才会进行这个判断，因为i等于1时，最多也就访问到s[i-1]，没法访问到s[i-2]
     * 依然要看看s[i-2]是不是为0，如果s[i-2]为0，那么s[i-2]s[i-1]两个元素就没法在一起被解码
     * 然后判断s[i-2]s[i-1]是不是在10-26的编码范围内，如果在，就说明s[i-2]s[i-1]是可以解码的
     * 所以这个时候，dp[i]就要加上dp[i-2]
     */
    if (i > 1 && s[i - 2] !== 0 && parseInt(s.substring(i - 2, i)) >= 10 && parseInt(s.substring(i - 2, i)) <= 26) {
      dp[i] += dp[i - 2]
    }
  }
  // 整个循环借结束之后，dp[len]就是最后的结果
  return dp[len]
};