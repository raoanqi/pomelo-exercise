//冒泡排序
const bubbleSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  // 冒泡排序使用两层循环，外层循环用于遍历数组的每一个元素
  for (let i = 0; i < len; i++) {
    // 这里将元素从头开始比较，从小到大进行排序，内层循环实现将第i+1大的元素冒泡的数组末尾
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[i], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

//选择排序
const selectionSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  let midIndex
  // 此为外层循环，考虑到内层循环从i+1开始，所以，所以外层循环的终止条件是len-1而不是len
  for (let i = 0; i < len - 1; i++) {
    midIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[midIndex]) midIndex = j
    }
    // 每完成一轮内层循环，判断midIndex是否发生了变化，如果发生了变化，
    // 说明在内层遍历时发现了更小的元素，所以更新更新midIndex以记录下来
    if (i !== midIndex) [arr[i], arr[midIndex]] = [arr[midIndex], arr[i]]
  }
  return arr
}

//插入排序
/**
 * 插入排序的原理：
 * 初始化时，认为数组的第一个元素是已经排好序的，因此for循环的起始条件是从1开始
 * 在遍历过程中，会依次对每个元素进行遍历，然后依靠while循环找到该元素应该在的位置，然后执行插入操作，将元素插入在正确的位置
 * 这样就能完成排序
 */
const insertionSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  // temp：记录for循环中遍历的当前元素
  // j：记录循环过程中的下标
  let temp, j
  for (let i = 1; i < len; i++) {
    temp = arr[i]
    j = i
    /**
     * 插入排序中，for循环已经循环过的部分是已经排好序的，即0~i-1的部分都是已经排好序的
     * 而while的作用是寻找arr[i]在已排序的0~i-1这个数组中的合适位置，所以while中的循环范围就是0~i-1，
     * 考虑到使用了arr[j-1]，所以在while中要判断j的值大于0而不能让j=0，
     * 一旦j=0，arr[j-1]就会出现arr[-1]，边界溢出
     */
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
  }
  return arr
}

//归并排序
const mergeSort = arr => {
  // 定义归并函数
  const merge = (left, right) => {
    const res = []
    let leftIndex = 0, rightIndex = 0
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        res.push(left[leftIndex])
        leftIndex++
      } else {
        res.push(right[rightIndex])
        rightIndex++
      }
    }
    return res.concat(left.slice(leftIndex), right.slice(rightIndex))
  }
  // 长度小于1，要么为空要么就只有一个元素，直接返回原数组
  const len = arr.length
  if (len <= 1) return arr
  // 将数组递归拆分
  const middle = Math.floor(len / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle, len)
  // 对left，right分别进行递归排序
  const leftSorted = mergeSort(left)
  const rightSorted = mergeSort(right)
  // 将排好序的左右两个子数组进行合并，组成当前这一轮排序的结果
  return merge(leftSorted, rightSorted)
}

//快速排序
const quickSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  let pivot = arr[0]
  const left = [], right = [], mid = []
  for (let i = 0; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      mid.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}