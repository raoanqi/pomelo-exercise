//二分查找
const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1
    // 等于号是为了考虑到数组长度为1的时候
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            // 如果中间元素等于目标元素，直接返回
            return mid
        } else if (arr[mid] > target) {
            // 如果中间元素大于目标元素，说明目标元素在左侧，将右指针移动到中间元素的左侧
            right = mid - 1
        } else {
            // 如果中间元素小于目标元素，说明目标元素在右侧，将左指针移动到中间元素的右侧
            left = mid + 1
        }
    }
    return -1
}