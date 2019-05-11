# Understand Life Cycle Hooks
How the app loads
When things happen at different places

> State must be initialized with the appropriate data type

When component state updates, component re-renders

Pros:
- UI Testing
- Faster Application
- JSX Readabilty
- Easier to integrate new frameworks

Single Source of Truth: Redux Global Store
Great for debugging!

Stateful:
- stores component state change in memory
- can change state, pass state/props to children

Stateless:
- can only receive props from a stateful componenet

# Lifecycles
- componentDidMount()
- componentDidUnmount()

Why would you use React/What is it?

```javascript
// Create an event in React

class Event extends React.component({

  event(evt) {
    // event logic
  }

  render() {
    return (
      <button onClick={this.event}>Click Me to run</button>
    )
  }
})

```

# CSS

- Selectors
- Box Sizing: border-box
- display, float

# JS
- Promises
3 states (fullfiled/rejected/pending)
async/await
observables?

# Scope
var - global
let/const - block
const - can't reassign, but can change properties inside
Closures
Inheratance, prototypical
ES6 Classes
currying/hoisting

# White Board
- String manipulation
- Palindromes
- Fibonacci
