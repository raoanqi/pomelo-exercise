//二叉树中序遍历
const inOrderTraverse = root => {
  const res = []
  const traverse = node => {
    if (!node) return
    traverse(node.left)
    res.push(node.val)
    traverse(node.right)
  }
  traverse(root)
  return res
}

//对称二叉树
const isMirrorTree = root => {
  const isMirror = (node1, node2) => {
    if (!node1 && !node2) return true
    if (!node1 || !node2 || node1.val !== node2.val) return false
    return isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
  }
  if (!root) return true
  return isMirror(root.left, root.right)
}

//二叉树的最大深度
const maxDepth = root => {
  const calc = node => {
    if (!node) return 0
    return Math.max(calc(node.left), calc(node.right)) + 1
  }
  return calc(root)
}

//翻转二叉树
const invertTree = root => {
  // 根节点为空就直接返回null
  if (!root) return null
  // 使用递归翻转左右两侧的子树
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  // 为根节点的左右子树重新赋值
  root.left = right
  root.right = left
  // 返回树的根节点
  return root
}

//二叉树的直径
const diameterOfBinaryTree = root => {
  let diameter = 0
  // 定义函数计算节点的最大深度
  const calcDepth = node => {
    if (!node) return 0
    const leftDepth = calcDepth(node.left), rightDepth = calcDepth(node.right)
    // 计算过程不断更新直径
    diameter = Math.max(diameter, leftDepth + rightDepth)
    // 因为使用递归运算计算深度，所以每次向下递归一层，深度值都要+1
    return Math.max(leftDepth, rightDepth) + 1
  }
  calcDepth(root)
  return diameter
}

//合并二叉树
const mergeTrees = (root1, root2) => {
  if (!root1) return root2
  if (!root2) return root1
  const mergeNode = new TreeNode(root1.val + root2.val)
  mergeNode.left = mergeTrees(root1.left, root2.left)
  mergeNode.right = mergeTrees(root1.right, root2.right)
  return mergeNode
}

//相同的树
var isSameTree = function(p, q) {
  const compareNode = (nodeA, nodeB) => {
    if (!nodeA && !nodeB) return true
    if ((!nodeA || !nodeB) || (nodeA.val !== nodeB.val)) return false
    return compareNode(nodeA.left, nodeB.left) && compareNode(nodeA.right, nodeB.right)
  }
  return compareNode(p, q)
}

//路径总和
var hasPathSum = function(root, targetSum) {
  // 如果当前的根节点为空，那么直接返回false
  if (!root) return false
  // 如果当前的根节点已经是叶子结点，那么就判断当前根节点的值是不是等于目标和
  if (!root.left && !root.right) return root.val === targetSum
  // 如果上面都不满足，那么就开始递归判断当前根节点的左右子树
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
}

//完全二叉树的节点个数
var countNodes = function(root) {
  if (!root) return 0
  let leftHeight = 0, rightHeight = 0, left = root, right = root
  // 计算左子树的高度
  while (left) {
    leftHeight++
    left = left.left
  }
  // 计算右子树的高度
  while (right) {
    rightHeight++
    right = right.right
  }
  /**
   * 题目中说明，同一层中的元素不是满的，那么都会出现在树的左侧
   * 这样一来，如果发现某一层的右子树高度如果与左子树高度相等，那么说明这个二叉树必然就是满二叉树，此时可以直接使用2^n-1计算节点数量
   * 否则，就要递归进行计算
   */
  if (leftHeight === rightHeight) {
    return Math.pow(2, leftHeight) - 1
  } else {
    // 如果不相等，递归计算左右子树的节点数
    return 1 + countNodes(root.left) + countNodes(root.right)
  }
}

// 108 将有序数组转换为二叉搜索树
const sortedArrayToBST = nums => {
  // 如果数组为空，那么根节点直接就是null
  if (nums.length === 0) return null
  /**
   * 定义函数：生成对应的平衡二叉树的根节点
   */
  const buildTree = (left, right) => {
    // 如果左指针大于右指针，那么说明已经走完整个nums数组了
    if (left > right) return null
    // 以left和right的中间点进行分割得到当前一轮构建中的mid
    // 以mid为值构建tree node
    const mid = Math.floor((left + right) / 2)
    const root = new TreeNode(nums[mid])
    // 根据函数定义，buildtree能够构建以（left，right）为参数的二叉树
    // 那么得到root之后，开始构建root的左子树和右子树
    root.left = buildTree(left, mid - 1)
    root.right = buildTree(mid + 1, right)
    // 最后返回根节点即可
    return root
  }
  return buildTree(0, nums.length - 1)
}

// 不同的二叉搜索树
const numTrees = n => {
  if (n === 0 || n === 1) return 1
  // 之所以长度为n+1,是因为要计算从0到n个元素的情况
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  // 随着元素逐渐增多，二叉树的数量也在变化，所以外层循环是从2到n（0，1已经处理过了）
  for (let i = 2; i <= n; i++) {
    // 在循环过程中，从1到i的每一个元素，都可以作为根节点，所以内层循环是从1到i
    for (let j = 1; j <= i; j++) {
      // 左子树和右子树是相互独立的，所以组合的结果是乘积
      // dp[j-1]：左子树的数量
      // dp[i-j]：右子树的数量
      // j-1,i-j加起来正好是i-1，就是去掉根节点的数量
      /**
       * @type {number}
       * 内层循环中，外层循环的每一个元素都有机会充当根节点，所以内层循环范围就是[1,i]
       * 在循环中，左子树的节点数量是j-1，所以右子树的节点数量就是(i-1)-(j-1)=i-j
       * 由于二叉树的层层递进的关系，因此dp[i]+=左子树数量*右子树数量
       */
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}

// 验证二叉搜索树
const isValidBST = root => {
  // 定义辅助的递归方法来进行判断
  const helper = (node, lower, upper) => {
    if (!node) return true
    // 对于第一次进入循环的根节点，lower是最小安全值，upper是最大安全值，检查根节点是否在安全值范围内
    // 对于后续的子节点，lower和upper的值会不断更新，因为左子节点的值必须小于父节点，而右子节点的值必须大于父节点
    if (node.val <= lower || node.val >= upper) return false
    return helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
  }
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
}

// 二叉树的层序遍历
const levelOrder = root => {
  // 如果根节点为空，直接返回空数组
  if (!root) return []
  // res：最终的遍历结果
  // queue：用于存储在下一轮遍历时需要遍历的节点，在开始遍历之前，初始化为[root]
  const res = [], queue = [root]
  /**
   * 核心思想：while用于遍历level，for循环用于遍历每个level从左到右的全部节点
   */
  while (queue.length) {
    const levelSize = queue.length
    const currentLevel = []
    for (let i = 0; i < levelSize; i++) {
      // 将当前这一层的节点全部取出来，放入到currentLevel中
      const node = queue.shift()
      currentLevel.push(node.val)
      // 对于当前遍历的每一个节点，都要判断是不是有左右子节点，有的话，就放入到queue中，用于下一轮遍历
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(currentLevel)
  }
  return res
}

// 从前序和中序遍历序列构造二叉树
const buildTree = (preorder, inorder) => {
  // 只要其中任意一个遍历为空，说明没有元素，无法构建，直接返回null
  if (!preorder.length || !inorder.length) return null
  // 前序遍历的第一个元素就是根节点，借此创建树的根节点
  const rootValue = preorder[0], root = new TreeNode(rootValue)
  // 在中序遍历中找到根节点的位置，根节点左边的元素都是左子树的元素，根节点右边的元素都是右子树的元素
  const rootIndex = inorder.indexOf(rootValue)
  // 构建左子树：前序遍历中，根节点之后的rootIndex个元素就是左子树的元素，中序遍历中，根节点左边的全部元素就是左子树的元素
  root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex))
  // 构建右子树：前序遍历中，根节点之后跳跃rootIndex个元素开始，才是右子树的元素，中序遍历中，根节点右边的全部元素就是右子树的元素
  root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1))
  // 返回树的根节点
  return root
}

// 二叉树展开为链表
const flatten = root => {
  // 如果根节点都不存在，那么直接return
  if (!root) return
  // 递归左右子树
  flatten(root.left)
  flatten(root.right)
  // 最终的链表其实就是基于右子树来改造实现的，所以保留右子树的引用
  const rightSubtree = root.right
  // 将左子树挂载到根节点的原始右子树的位置，替换了原来的右子树，然后左子树就不需要了，清空左子树
  root.right = root.left
  root.left = null
  /*
  * 二叉树有个特点，就是左子树是排序的并且小于等于中间节点，中间节点小于等于右子树，右子树也是排序的
  * */
  let currentNode = root
  while (currentNode.right) {
    currentNode = currentNode.right
  }
  // 将之前记录下来的右子树，直接拼接在新的右子树的后面，这样就是一个按顺序的链表了
  currentNode.right = rightSubtree
}

// 230 二叉搜索树中第K小的元素
/**
 * @param root
 * @param k
 * @returns {*}
 * 因为是二叉搜索树，所以树的中序遍历就是一个从小到大排序的数组
 * 那么第k大的元素直接取出来即可
 * 但是这里并没有先遍历完再去取第k大的元素，因为第k大的元素后面的元素不用管
 * 因此采用while循环的方式来实现遍历，每遍历一个节点，k就会减去1，这样当k为0的时候，就是第k大的元素了
 * 时间复杂度：O(n)，因为最坏的情况下，需要访问全部n个节点才能得到答案
 */
var kthSmallest = function(root, k) {
  const stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    k--
    if (k === 0) return root.val
    root = root.right
  }
}

// 树转数组
const treeToArray = tree => {
  const arr = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.pop()
    arr.push({
      id: node.id,
      name: node.name,
      parentId: node.parentId
    })
    if (node?.children?.length) {
      stack.push(...node.children.map(child => ({ ...child, parentId: node.id })))
    }
  }
  return arr
}
const sourceTree = [
  {
    id: 1,
    name: 'text1',
    children: [
      {
        id: 2,
        name: 'text2',
        children: [
          {
            id: 4,
            name: 'text4'
          }
        ]
      },
      {
        id: 3,
        name: 'text3'
      }
    ]
  }
]
console.log('树转数组')
console.log(treeToArray(sourceTree))


