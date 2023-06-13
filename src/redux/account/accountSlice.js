import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated : false,

  user : {
    avatar : "",
    email : "",
    fullName : "",
    id : "",
    phone : "",
    role : ""
  },
  
};



export const accountSlice = createSlice({
  name: 'account',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLogin: (state,action) => {
       state.isAuthenticated = true,
       state.user = action.payload.user
      
    },
    doLogOut: (state) => {
        state.isAuthenticated = false,
        state.user = {
            avatar : "",
            email : "",
            fullName : "",
            id : "",
            phone : "",
            role : ""
        }
     },

 
  },


});

export const { doLogin, doLogOut } = accountSlice.actions;



export default accountSlice.reducer;
