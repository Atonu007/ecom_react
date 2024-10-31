import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {}, 
  products: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    // Set user info
    setUserInfo: (state, action) => {
      state.userInfo = action.payload; 
    },
    // Clear user info
    clearUserInfo: (state) => {
      state.userInfo = {}; 
    },
     // Clear user info on logout
    logoutUser: (state) => {
      state.userInfo = {};
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  setUserInfo,
  clearUserInfo,
  logoutUser, 
} = orebiSlice.actions;

export default orebiSlice.reducer;
