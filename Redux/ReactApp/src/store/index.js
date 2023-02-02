// import {createStore} from 'redux'
import authSlice from './auth.js'
import counterSlice from './counter.js'
import {configureStore} from '@reduxjs/toolkit';


// action creators



// const changeState = (state = initialState, action) => {
//     // never mutate your state, always return a new state
//     if(action.type === "increment"){
//         return{
//             counter:state.counter + 1,
//             showCounter:state.showCounter,
//         }
//     }
//     if(action.type === "increase"){
//         return{
//             counter:state.counter + action.amount,
//             showCounter:state.showCounter,
//         }
//     }

//     if(action.type === "decrement"){
//         return{
//             counter:state.counter - 1,
//             showCounter:state.showCounter,
//         }
//     }

//     if(action.type === "toggle"){
//         return{
//             counter:state.counter,
//             showCounter:!(state.showCounter),
//         }
//     }
//     return state;
// }

// counterSlice should use .reducer only
// const store = createStore(counterSlice.reducer);

const store = configureStore({
    reducer:{auth:authSlice.reducer, counter:counterSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;