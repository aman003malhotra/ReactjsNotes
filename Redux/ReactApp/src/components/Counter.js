// connect is used for class based component
import {React, Component} from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  // automatically adds the subscription so that the state is updated automatically
  let counter = useSelector(state => state.counter);
  let showCounter = useSelector(state => state.showCounter);

  const dispatch = useDispatch()
  
  // const [count, setCount] = useState()
  const toggleCounterHandler = () => {
      dispatch({type:'toggle'});
    };
  
  const increment = () => {
    dispatch({type:'increment'});
  };

  const increaseHandler = () => {
    dispatch({type:'increase', amount:5});
  };

  const decrement = () => {
    dispatch({type:'decrement'});
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <button onClick={increment}>Increment</button>
      <button onClick={increaseHandler}>Increment By 5</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class CounterClass extends Component{
//   constructor(props){
//     super(props);
//   }
//   toggleCounterHandler(){  };
  
//   increment(){
//     this.props.increment();
//   };

//   decrement(){
//     this.props.decrement();

//   };

//   render(){
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <button onClick={this.increment.bind(this)}>Increment</button>
//         <button onClick={this.decrement.bind(this)}>Decrement</button>
//         <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state =>{
//   return{
//     counter:state.counter,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return{
//     increment: () => dispatch({type:'increment'}),
//     decrement: () => dispatch({type:'decrement'}),

//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);
