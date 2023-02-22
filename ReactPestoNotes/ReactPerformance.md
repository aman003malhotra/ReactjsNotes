- Always Profile before optimization

## shouldComponent Update 
- If you are confident you want to write it by hand, you may compare this.props with nextProps and this.state with nextState and return false to tell React the update can be skipped.
- Note that returning false does not prevent child components from re-rendering when their state changes.
- generally shouldComponentUpdate only returns true.

```
shouldComponentUpdate(nextProps){
    const { message: originalMessage} = this.props;
    const { message: newMessage} = nextProps;
    return newMessage != originalMessage;
} 
```

## Pure Component 
- React.PureComponent is similar to React.Component. 
- The difference between them is thatReact.Component doesn't implement shouldComponentUpdate(), but React.PureComponent implements it with a `shallow` prop and state comparison.
- Furthermore, React.PureComponent's shouldComponentUpdate() skips prop updates for the whole component subtree. `Make sure all the children components are also "pure"`.

```
class Message extends React.Component{

}
```

## React.memo 
- If your component renders the same result given the same props, use `React.memo`.
- React.memo only checks (shallowly) for prop changes. If your function component wrapped in React.memo has a useSthe or useContext Hook in its implementation, it will still rerender when state or context change.
- It is a HOC. Deep Checking using the second prop.

```
const Message = React.memo(function Message({ message }){
    console.log(`<Message name={${message}} /> - ${ count++ })
})
```

## useCallback 
- Returns memoized function. 
- Pass an inline callback and an array of dependencies. 
- useCallback will return a memoize version of the callback that only changes if one of the `dependencies` has changed.

```
    const memoizedCallback = useCallback(
        () => {
            doSomething(a, b);
        }, [dependencies])
```

## useMemo 
- Returns a memoized value. Pass a "create" function and an array of dependencies.
- useMemo will only recompute the memoized value when one of the dependencies has changed.
- This optimization helps to avoid expensive calculations on every render. 
- If no array is provided, a new value will be computed on every render.
- Only remembers the last value.

```
const memoizedValue = useMemo( ( ) => computeExpensiveValue(a, b), [a,b]);
```

## Third party utilities
- There may be times where you need to display a large table or list that contains many rows.
- List virtualization, or `windowing`, is the concept of only rendering what is visible to the user.
- The number of elements that are rendered at first is a very small subset of the entire list and the `window` of visible content moves when the user continues to scroll.
- This improves both the rendering and scrolling performance of the list.

### react-window 
- react-window is a small, third-party library that makes it easier to create virtualized lists in your application.
- `When to use fized size list` - Use the FixedSizeList component if you have a long, one-dimensional list of equally sized items.

```
  const Row = ( { index, style } )
<div style={style}>
{ / * Component * / }
</div>

const ListComponent =() => (
    <FixedSizeList
    height={500}
    width={500}
    itemSize = {120}
    itemCount = {items.length} 
    >
    {Row}
    </FixedSizeList>
)

```

- itemSize - size in px of one item
- height, width - size of the window.
- itemCount - totalItems
