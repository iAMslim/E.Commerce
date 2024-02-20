import { configureStore } from "@reduxjs/toolkit";
import { BookApi } from "../api/BookApi";
import { CartApi } from "../api/CartApi";
import { OrderApi } from "../api/OrderApi";
import { UserApi } from "../api/UserApi";
import booksSlice from "../slices/BooksSlice";
import UserSlice from "../slices/UserSlice";
import AuthSlice from "../slices/AuthSlice";
import ordersSlice from "../slices/OrdersSlice";
import cartSlice from "../slices/CartSlice";

const store = configureStore({
  reducer: {
    booksSlice,
    AuthSlice,
    UserSlice,
    ordersSlice,
    cartSlice,
    [BookApi.reducerPath]: BookApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      BookApi.middleware,
      CartApi.middleware,
      OrderApi.middleware,
      UserApi.middleware
    ),
});

export default store;
