//冒泡排序
/**
 * @param arr
 * @returns {*}
 * 时间复杂度：O(n^2)
 * 是稳定排序
 */
const bubbleSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  // 冒泡排序使用两层循环，外层循环用于遍历数组的每一个元素
  for (let i = 0; i < len; i++) {
    // 这里将元素从头开始比较，从小到大进行排序，内层循环实现将第i+1大的元素冒泡的数组末尾
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

//选择排序
/**
 * @param arr
 * @returns {*}
 * 时间复杂度：O(n^2)
 * 不是稳定排序
 */
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
 * 时间复杂度：O(n^2)
 * 是稳定排序
 */
/**
 * 插入排序的原理：
 * 初始化时，认为数组的第一个元素是已经排好序的，因此for循环的起始条件是从1开始
 * 在遍历过程中，会依次对每个元素进行遍历，然后依靠while循环找到该元素应该在的位置，然后执行插入操作，将元素插入在正确的位置
 * 这样就能完成排序
 */
const insertionSort = arr => {
  const len = arr.length
  if (len <= 1) return arr
  for (let i = 1; i < len; i++) {
    // 从第二个元素开始，将当前元素插入已排序的部分
    let currentElement = arr[i];
    let j = i - 1;
    // 将大于当前元素的元素向右移动
    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 插入当前元素到正确位置
    arr[j + 1] = currentElement;
  }
  return arr
}

//归并排序
const mergeSort = arr => {
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