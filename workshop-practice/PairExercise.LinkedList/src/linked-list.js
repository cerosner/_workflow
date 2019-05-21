// YOUR CODE HERE
class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.previous = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  addToTail(value) {
    const node = new Node(value)

    if (!this.tail) {
      this.tail = node
      this.head = node
    } else {
      node.previous = this.tail
      this.tail.next = node
      this.tail = node
    }
  }

  addToHead(value) {
    const node = new Node(value)

    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head.previous = node
      this.head = node
    }
  }

  removeHead() {
    if (!this.head) return null

    const headToRemove = this.head

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
    } else {
      this.head.next.previous = null
      this.head = this.head.next
    }

    return headToRemove.value
  }

  removeTail() {
    if (!this.tail) return null

    const tailToRemove = this.tail

    if (this.tail === this.head) {
      this.tail = null
      this.head = null
    } else {
      this.tail.previous.next = null
      this.tail = this.tail.previous
    }

    return tailToRemove.value
  }

  search(value) {
    if (typeof value === 'string') {
      const valueStr = value

      value = nodeValue => nodeValue === valueStr
    }

    let currentNode = this.head

    while (currentNode) {
      if (value(currentNode.value)) return currentNode.value
      else currentNode = currentNode.next
    }

    return null
  }
}
