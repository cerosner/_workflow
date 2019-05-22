// YOUR CODE HERE
class BinarySearchTree {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.treeSize = 1
  }

  insert(value) {
    const direction = value < this.value ? 'left' : 'right'

    if (this[direction]) this[direction].insert(value)
    else this[direction] = new BinarySearchTree(value)

    this.treeSize++
  }

  contains(value) {
    const direction = value < this.value ? 'left' : 'right'

    if (this.value === value) return true
    else if (!this[direction]) return false
    else return this[direction].contains(value)
  }

  depthFirstForEach(callback, order = 'in-order') {
    if (order === 'pre-order') callback(this.value)
    if (this.left) this.left.depthFirstForEach(callback, order)
    if (order === 'in-order') callback(this.value)
    if (this.right) this.right.depthFirstForEach(callback, order)
    if (order === 'post-order') callback(this.value)
  }

  breadthFirstForEach(callback) {
    const queue = [this]

    while (queue.length > 0) {
      let currentNode = queue.shift()

      callback(currentNode.value)

      if (currentNode.left) queue.push(currentNode.left)
      if (currentNode.right) queue.push(currentNode.right)
   }
  }

  size = () => this.treeSize
}
