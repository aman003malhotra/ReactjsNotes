import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated:false
}

const authSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        // it is not directly changing the state but behind it is making a copy updating the field and returning a new state
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }    
    }
});

export default authSlice;