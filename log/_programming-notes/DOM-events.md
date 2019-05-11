```javascript
// declare callback for event listener
function callback() {
  alert('Hello World')
  element.removeEventListener(sameEventName, callback, use-capture)
})

// add listener
element.addEventListener(eventName, callback, use-capture: boolean)
```

# The Event Object
Created and carried through the DOM (Document Object Model)
Event listener callback takes this object as its argument

## Event Phases
- Capture: document root down-> target node
  - Event fires on every node through the tree until it reaches the target
  - Builds the propogation path to travel back through bubbling phase
- Target: fires on the selected element
  - Events are always targeted at the most deeply nested elements
  - Bubbling allows for you to still invoke callbacks as the events travel back up
- Bubbling: target node up-> document root
  - Don't have to listen for events on exact elements, wait for them to reach us

```javascript
child.addEventListener('click', function(event) {
  event.stopPropagation()  // no longer call any listeners on any other nodes just the target
})

anchor.addEventListener('click'), function(event) {
  event.preventDefault()  // <a> elements make the browser reload as its default response
})
```

## Delegate Event Listeners
Listen for events on parent elements <ul> instead of individual children <li>
Inspectiing `event.target` lets us know which child was clicked


