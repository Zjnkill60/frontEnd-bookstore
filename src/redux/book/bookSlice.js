import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  listBookFromCart : [],
  

  
};



export const bookSlice = createSlice({
  name: 'book',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    doAddBookToCart: (state ,action) => {
      let isRecur = false
      state.listBookFromCart.map(item => {
        if(item.dataBook._id == action.payload.dataBook._id) {
          item.total += Number(action.payload.total)
          isRecur = true
        }
      })

      if(isRecur == false) {
        state.listBookFromCart = [action.payload , ...state.listBookFromCart]
      }

    
    },

    doChangeTotal: (state, action) => {
      state.listBookFromCart.map(item => {
        if(item.dataBook._id == action.payload.dataBook._id) {
          console.log(11)
          item.total = Number(action.payload.total)
         
        }
      })
    },

    doRemoveItemFromOrder: (state,action) => {
        state.listBookFromCart.splice(action.payload,1)
    },

    doOrderSuccess : (state) => {
      state.listBookFromCart = []
    }
  },


});

export const { doAddBookToCart ,doChangeTotal,doRemoveItemFromOrder,doOrderSuccess} = bookSlice.actions;



export default bookSlice.reducer;
