import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialCounterState = {
    counter : 0,
    showCounter : false
}

const counterSlice = createSlice({
    name:'counter',
    initialState:initialCounterState,
    reducers:{
        // it is not directly changing the state but behind it is making a copy updating the field and returning a new state
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state, action){
            state.counter += action.payload;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter
        },    
    
    }
});

export default counterSlice;