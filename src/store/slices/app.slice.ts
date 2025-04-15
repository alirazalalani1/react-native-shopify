import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartId: null,
  checkoutURL: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },

    setCheckoutURL: (state, action) => {
      state.checkoutURL = action.payload;
    },
  },
});

export const {setCartId, setCheckoutURL} = appSlice.actions;
export default appSlice.reducer;
