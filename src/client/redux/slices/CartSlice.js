import { createSlice } from "@reduxjs/toolkit";
import { CartApi } from "../api/CartApi";


const storeCart = (state, { payload }) => {
  state.cart = payload; 
  window.sessionStorage.setItem("cart", JSON.stringify(payload));
};


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(window.sessionStorage.getItem("cart")) || null,
  },
  extraReducers: (builder) => {
   
    builder.addMatcher(CartApi.endpoints.createCart.matchFulfilled, storeCart);
   
  },
});

export default cartSlice.reducer;
