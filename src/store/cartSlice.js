import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, category_Id } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { 
          id,
          name, 
          price,
          category_Id,
          quantity: 1 
        };
      }
      state.totalItems += 1;
      state.totalPrice += price;
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  }
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;