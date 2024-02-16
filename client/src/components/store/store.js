import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import booksSlice from "../slices/booksSlice"
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";
import ordersSlice from "../slices/ordersSlice";
import cartSlice from "../slices/cartSlice"
// any reason why line 7 does not end with cartslice like all the above slices?

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    books: booksSlice,
    orders: ordersSlice,
    users: userSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;