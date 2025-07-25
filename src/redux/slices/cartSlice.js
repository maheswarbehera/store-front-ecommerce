// redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItem')) || [],
};

const syncToLocalStorage = (items) => {
  localStorage.setItem('cartItem', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart(state, action) {
    //   const item = action.payload;
    //   const existingItem = state.items.find(i => i._id === item._id);
    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     state.items.push({ ...item, quantity: 1 });
    //   }
    //   localStorage.setItem('cartItem', JSON.stringify(state.items));
    // },
    // updateQuantity(state, action) {
    //   const { id, quantity } = action.payload;
    //   const item = state.items.find(i => i.id === id);
    //   if (item) item.quantity = quantity;
    // },
    // removeFromCart(state, action) {
    //   state.items = state.items.filter((item) => item.id !== action.payload);
    // },
    // incrementQuantity(state, action) {
    //   const item = state.items.find(i => i.id === action.payload);
    //   if (item) {
    //     item.quantity += 1;
    //   }
    //   localStorage.setItem('cartItem', JSON.stringify(state.items));
    // },
    // decrementQuantity(state, action) {
    //   const item = state.items.find(i => i.id === action.payload);
    //   if (item && item.quantity > 1) {
    //     item.quantity -= 1;
    //   }
    //   localStorage.setItem('cartItem', JSON.stringify(state.items));
    // },
    // clearCart(state) {
    //   state.items = [];
    // },
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      syncToLocalStorage(state.items);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        syncToLocalStorage(state.items);
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
      syncToLocalStorage(state.items);
    },

    incrementQuantity(state, action) {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        syncToLocalStorage(state.items);
      }
    },

    decrementQuantity(state, action) {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        syncToLocalStorage(state.items);
      }
    },

    clearCart(state) {
      state.items = [];
      syncToLocalStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
