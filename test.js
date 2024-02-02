var myPow = function (x, n) {
  if (n === 0) return 1
  const flag = n > 0
  n = Math.abs(n)
  let count = 1, res = x
  while (count < n) {
    res *= x
    count++
  }
  res = flag ? res : 1 / res
  return res.toFixed(5)
};

console.log(myPow(2, -2))