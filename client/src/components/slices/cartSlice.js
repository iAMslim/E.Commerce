import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

// Define a reducer function to store cart data in state and session storage
const storeCart = (state, { payload }) => {
  state.cart = payload; // Assuming the payload contains the cart object
  window.sessionStorage.setItem("cart", JSON.stringify(payload));
};

// Create a slice for managing cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(window.sessionStorage.getItem("cart")) || null,
  },
  extraReducers: (builder) => {
    // Add extra reducers to handle actions dispatched by API endpoints
    builder.addMatcher(api.endpoints.createCart.matchFulfilled, storeCart);
    //add more matchers for other cart-related actions like updating or deleting cart
  },
});

export default cartSlice.reducer;
