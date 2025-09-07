import { createSlice } from "@reduxjs/toolkit";
// import { TUser } from "./authApi";

const loadUserFromLocalStorage = () =>{
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? {user: JSON.parse(storedUser)} : {user : null };
    } catch (error: any) {
        return { user : null };
    }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logout: (state) =>{
            state.user = null;
            localStorage.removeItem("user")
        }
    }
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;