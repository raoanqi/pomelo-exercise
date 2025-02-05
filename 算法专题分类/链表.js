//合并两个有序链表
// 时间复杂度O(m+n)
// 空间复杂度O(1)
const mergeTwoLinkList = (l1, l2) => {
  const dummy = new ListNode(-999)
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

//回文链表
// 时间复杂度O(n)
// 空间复杂度O(1)
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

// 链表的中间结点
/*
* 思路：使用双指针：快慢指针，快指针每次走两步，慢指针每次走一步，当快指针走到最后一个元素时，
* 如果链表长度为奇数，那么慢指针这个时候就指向中间结点
* 如果链表长度为偶数，那么慢指针这个时候就指向中间两个元素的后一个元素
* */
var middleNode = function (head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};

//两数相加
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode(0)
  // carry用于记录进位
  let current = dummy, carry = 0
  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = carry + x + y
    // sum除以10得到进位的数目
    carry = Math.floor(sum / 10)
    // 余数就是留在当前位置的数
    current.next = new ListNode(sum % 10)
    current = current.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  // 如果最后有进位，还要继续创建最后的一个节点
  if (carry > 0) {
    current.next = new ListNode(carry)
  }
  return dummy.next
}

//删除链表的倒数第n个节点
const removeNthFromEnd = (head, n) => {
  // 定义一个dummy节点，用于处理删除头结点的情况
  const dummy = new ListNode(0)
  dummy.next = head
  // 使用快慢指针
  let slow = dummy, fast = dummy
  // 快指针先向前移动n+1步，这样快慢指针之间就有n个节点的间隔
  for (let i = 0; i <= n; i++) fast = fast.next
  // 此时，fast指向最后一个节点的下一个节点，其实就是空节点，而slow因为与fast之间有n个节点的间隔，所以slow指向的是倒数第n个节点的前一个节点
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  // 此时，slow指向待删除节点的前一个节点，slow.next就是待删除的节点，直接丢弃该节点即可
  slow.next = slow.next.next
  // dummy.next就是链表的头节点，按照惯例，返回头结点
  return dummy.next
}

// 环形链表2：寻找环的入口
const detectCycle = head => {
  // 如果链表为空或者只有一个节点，那么不可能存在环形链表，直接返回null代表不存在这个环的入口节点
  if (!head || !head.next) return null
  // 使用快慢指针
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    // 如果快慢指针相遇，说明存在环
    if (slow === fast) {
      // 注意下面的逻辑，将slow重置为head，然后快慢指针同向单步移动，最终的交点就是环的入口
      slow = head
      while (slow !== fast) {
        slow = slow.next
        fast = fast.next
      }
      return slow
    }
  }
  return null
}

// 分隔链表：注意每次循环之后要将当前的元素从链表中清除
var partition = function (head, x) {
  /*
  * 思路：创建两个新的链表，然后遍历题目中给出的链表，小于的放在其中一个链表，
  * 大于的放在另外一个链表，最后合并两个链表
  * */
  const dummy1 = new ListNode(-1)
  const dummy2 = new ListNode(-1)
  let current1 = dummy1, current2 = dummy2
  let current = head
  while (current) {
    if (current.val >= x) {
      current2.next = current
      current2 = current2.next
    } else {
      current1.next = current
      current1 = current1.next
    }
    /*
    * 这里比较关键：每次循环一个元素，都要将这个元素从题目所给的链表中清除，否则容易造成环形链表
    * */
    const temp = current.next;
    current.next = null;
    current = temp
  }
  current1.next = dummy2.next
  return dummy1.next
};

// 237 删除链表中的节点
/**
 * @param node
 * 时间复杂度：O(1)，操作一个元素即可
 */
const deleteNode = node => {
  /**
   * 删除node这个链表节点，可以采用这种思路：
   * 将node的val替换为node的下一个元素的val
   * 然后将node的next指向node的下一个元素的next
   * 总体来说，相当于是将node改造为了node的下一个元素，这样就等价于删除了node元素本身
   * 因为是单向链表，所以无法通过将node的上一个元素的next指向node.next实现删除
   */
  node.val = node.next.val
  node.next = node.next.next
};

// 328 奇偶链表
/**
 * @param head
 * @returns {{next}|*}
 * 时间复杂度：O(n)，空间复杂度为常数空间O(1)
 */
const oddEvenList = head => {
  // 如果head为空，直接返回空即可
  // 如果链表只有一个或者两个元素，那么也不用重新排序，直接返回即可
  if (!head || !head.next || !head.next.next) return head
  // 分别定义奇数链表和偶数链表的头节点
  let oddHead = head, evenHead = head.next
  // 分别定义奇数链表和偶数链表用于遍历的指针
  let oddCurrent = head, evenCurrent = head.next
  /**
   * 开始循环
   */
  while (evenCurrent && evenCurrent.next) {
    oddCurrent.next = evenCurrent.next
    oddCurrent = oddCurrent.next
    evenCurrent.next = oddCurrent.next
    evenCurrent = evenCurrent.next
  }
  // 循环结束之后奇数链表和偶数链表就已经都生成了，将偶数链表追加到奇数链表之后
  oddCurrent.next = evenHead
  // 然后返回整个链表的头节点，就是奇数链表的头即可
  return oddHead
};



