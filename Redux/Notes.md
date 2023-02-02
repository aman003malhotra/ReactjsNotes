## Redux
- It is a state management system for cross-component or app-wide state.Flux like state managemtn library.It is a central data (state) store.Components don't directly change the data of the store, we used reducer function which is not same as useReducer.Components trigger actions and then the actions are forwarded to reducer function then the reducer changes the data the store.

### Cross-component 
- state that effects multiple components
- open/closed state of a modal overlay.
- requires prop drilling/ prop chains.

### Local State
- state that belongs to a single component.
- eg. listening to user input.
- managed by useState() or useReducer

### App wide state
- state that affects the entire app(most/all the components).
- user authentication status.
- requires props chains, props drilling.

- ReactContext and Redux does the same thing.

### Disadvantages of React Context
- Complex setup and Mangement.
- Perfromance
- In more complex apps, managing React Context can lead to deeply nested JSX code and /or huge "Context Provider" components
- React context is not optimized for high frequency changes.

