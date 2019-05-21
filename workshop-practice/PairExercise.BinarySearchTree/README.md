# Test-First Binary Search Tree

**Note: be sure to read this README.md thoroughly, as well as the comments in the test spec (when you run the tests, a page should open in your browser that displays the comments in a friendly, readable format)**

In this portion of the workshop, we are going to be writing the JavaScript implementation of a Binary Search Tree.

## Running

You should have Testem installed globally. *If not*: `npm install -g testem`.

1. Run `npm install` to install all the other software packages needed (called "dependencies")
2. Run `npm test` - this will cause the specs to run (you can view them at http://localhost:7357/), and will also open an html page with all of the test specs alongside their documentation.

### Binary Search Tree DS

When we implemented our Linked List, we had a central `LinkedList` object that had "handles" on the head and tail `Nodes`, which in turn "pointed" to the next and previous `Node` in the list.

Our Binary Search Tree, however, is a *recursive* data structure. This means that *every `BinarySearchTree` instance is itself a `BinarySearchTree`.* There is no "central" object with handles.

This means that many of your methods should employ recursive problem solving!
