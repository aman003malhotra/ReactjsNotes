## Higher Order Components
- share the same functionality across the multiple components
- Is a component.
- takes in a component as an argument
- returns a new component
- the component it returns can render the original component that was passed in.

```
function higherOrderComponent (Component)
    return class extends React. Component {
        render() {
            return <Component / >
        }
    }
}
```

### What can you do with HOC's
- Code reuse, logic and bootstrap abstraction
- Render hijacking
    * Read, add, edit, remove props in any of the React Elements output by render
    * Read, and modify the React Elements tree output by render
    * Conditionally display the elements tree
    * Wrapping the element's tree for styling purposes (as shown in Props Proxy)
- State abstraction and manipulation
- Props manipulation
