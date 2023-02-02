import {createStore} from 'redux'

const initialState = {
    counter : 0,
    showCounter : false
}
const changeState = (state = initialState, action) => {
    // never mutate your state, always return a new state
    if(action.type === "increment"){
        return{
            counter:state.counter + 1,
            showCounter:state.showCounter,
        }
    }
    if(action.type === "increase"){
        return{
            counter:state.counter + action.amount,
            showCounter:state.showCounter,
        }
    }

    if(action.type === "decrement"){
        return{
            counter:state.counter - 1,
            showCounter:state.showCounter,
        }
    }

    if(action.type === "toggle"){
        return{
            counter:state.counter,
            showCounter:!(state.showCounter),
        }
    }
    return state;
}

const store = createStore(changeState);
export default store;