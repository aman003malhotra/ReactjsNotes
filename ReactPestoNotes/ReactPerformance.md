- Always Profile before optimization
- shouldComponent Update - If you are confident you want to write it by hand, you may compare this.props with nextProps and this.state with nextState and return false to tell React the update can be skipped. Note that returning false does not prevent child components from re-rendering when their state changes.
- generally shouldComponentUpdate only returns true.

```
shouldComponentUpdate(nextProps){
    const { message: originalMessage} = this.props;
    const { message: newMessage} = nextProps;
    return newMessage != originalMessage;
} 
```

- Pure Component - React.PureComponent is similar to React.Component. The difference between them is thatReact.Component doesn't implement shouldComponentUpdate(), but React.PureComponent implements it with a `shallow` prop and state comparison.Furthermore, React.PureComponent's shouldComponentUpdate() skips prop updates for the whole component subtree. `Make sure all the children components are also "pure"`.

```
class Message extends React.Component{

}
```

- React.memo - If your component renders the same result given the same props, use `React.memo`.React.memo only checks (shallowly) for prop changes. If your function component wrapped in React.memo has a useSthe or useContext Hook in its implementation, it will still rerender when state or context change. It is a HOC.

```
const Message = React.memo(function Message({ message }){
    console.log(`<Message name={${message}} /> - ${ count++ })
})
```