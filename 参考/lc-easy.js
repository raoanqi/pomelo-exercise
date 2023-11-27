//两数之和
const twoNumberSum = (nums, target) => {
    const map = new Map(), len = nums.length
    for (let i = 0; i < len; i++) {
        let temp = target - nums[i]
        if (map.has(temp)) {
            return [map.get(temp), i]
        }
        map.set(nums[i], i)
    }
}

//有效括号
const validBrackets = str => {
    if ([')', ']', '}'].includes(str[0])) return false
    const temp = [], len = str.length
    for (let i = 0; i < len; i++) {
        if (['(', '[', '{'].includes(str[i])) {
            temp.push(str[i])
        } else {
            const peek = temp[temp.length - 1]
            if ((str[i] === '(' && peek === ')') || (str[i] === '[' && peek === ']') || (str[i] === '{' && peek === '}')) {
                temp.pop()
            } else {
                return false
            }
        }
    }
    return !temp.length
}

//合并两个有序链表
const mergeTwoLinkList = (l1, l2) => {
    const dummy = new ListNode(0)
    let current = dummy

    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1
            l1 = l1.next
        } else {
            current.next = l2
            l2 = l2.next
        }
        current = current.next
    }
    if (l1) current.next = l1
    if (l2) current.next = l2

    return dummy.next
}

//爬楼梯
const stairs = (n) => {
    if (n <= 0) return 0
    if (n === 1) return 1
    if (n === 2) return 2
    let n1 = 1, n2 = 2, res = 0
    for (let i = 3; i <= n; i++) {
        res = n1 + n2
        n1 = n2
        n2 = res
    }
    return res
}

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

//买卖股票的最佳时机
const sellStock = prices => {
    const len = prices.length
    let benefit = 0, lowest = prices[0]
    for (let i = 1; i < len; i++) {
        benefit = Math.max(benefit, prices[i] - lowest)
        lowest = Math.min(lowest, prices[i])
    }
    return benefit
}

//只出现一次的数字
const singleNumber = nums => {
    const len = nums.length
    let res = 0
    for (let i = 0; i < len; i++) {
        res ^= nums[i]
    }
    return res
}

//环形链表
const hasCycle = head => {
    if (!head || !head.next) return false
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
    }
    return false
}

//相交链表
const getIntersectionNode = (l1, l2) => {
    const set = new Set()
    //先将其中一条链表的节点全部加入set，set中存储的是地址
    while (l1) {
        set.add(l1)
        l1 = l1.next
    }
    //然后将第二条链表的节点依次添加，如果发现地址重合，说明遇到了相同的节点，这样就找到了相交的节点
    while (l2) {
        if (set.has(l2)) return l2
        l2 = l2.next
    }
    return null
}

//多数元素
//使用投票算法：需要确保元素出现的次数在总数的二分之一以上
const majorityElement = nums => {
    let count = 0, candidate
    for (let ele of nums) {
        /**
         * count为0，有两种情况：
         * 1.for循环刚开始
         * 2.循环中count先增大，然后被降为0，说明之前设置的候选元素肯定没有超过n/2，所以不是多数元素，所以此时要重新设置候选元素
         **/
        (count === 0) && (candidate = ele)
        // 出现了不同元素相当于就会对消之前的结果
        count += candidate === ele ? 1 : -1
    }
    return candidate
}

//反转链表
const reverseList = head => {
    let prev = null; // 前一个节点
    let curr = head; // 当前节点
    while (curr !== null) {
        const next = curr.next; // 下一个节点
        curr.next = prev; // 将当前节点的 next 指针指向前一个节点
        prev = curr; // 更新前一个节点为当前节点
        curr = next; // 当前节点后移
    }
    return prev; // 返回反转后的链表头节点
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

//回文链表
const isPalindrome = l1 => {
// 定义函数翻转链表
    const reverseLinkList = node => {
        let prev = null, current = node
        while (current) {
            // 记录current的next，防止循环过程中覆盖后值丢失
            let next = current.next
            current.next = prev
            prev = current
            current = next
        }
        return prev
    }
    // 空链表或者只有一个节点，算作回文链表
    if (!l1 || !l1.next) return true
    // 使用快慢指针找到链表的中间位置
    let slow = l1, fast = l1
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    // 翻转后半部分链表
    let reverseLastHalf = reverseLinkList(slow)
    // 分别从头和尾开始遍历
    let p1 = l1, p2 = reverseLastHalf
    while (p2) {
        if (p1.val !== p2.val) return false
        p1 = p1.next
        p2 = p2.next
    }
    return true
}

//移动零
const moveZeroes = nums => {
    const len = nums.length
    if (!len) return
    let count = 0
    for (let i = 0; i < len - count; i++) {
        if (nums[i] === 0) {
            nums.push(0)
            nums.splice(i, 1)
            i--
            count++
        }
    }
}

//比特位计数
const countBits = n => {
    const count = num => {
        let count = 0
        while (count !== 0) {
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

// todo:不太明白
//找到所有数字中消失的数字
const findDisappearedNumbers = nums => {
    const res = [], len = nums.length
    // 第一遍：标记出现过的数字
    for (let i = 0; i < len; i++) {
        const index = Math.abs(nums[i]) - 1
        if (nums[index] > 0) nums[index] = -nums[index]
    }
    // 第二遍
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) res.push(i + 1)
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