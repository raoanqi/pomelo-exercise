// 两数相加
const addTwoNumbers = (l1, l2) => {
    const dummy = new ListNode(0)
    let current = dummy, carry = 0
    while (l1 || l2) {
        const x = l1 ? l1.val : 0
        const y = l2 ? l2.val : 0
        const sum = carry + x + y
        carry = Math.floor(sum / 10)
        current.next = new ListNode(sum % 10)
        current = current.next
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    if (carry > 0) current.next = new ListNode(carry)
    return dummy.next
}
