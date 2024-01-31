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