import { configureStore } from "@reduxjs/toolkit";
import { BookApi } from "../api/BookApi";
import { CartApi } from "../api/CartApi";
import { OrderApi } from "../api/OrderApi";
import { UserApi } from "../api/UserApi";
import { AuthApi } from "../api/AuthApi";
import BooksSlice from "../slices/BooksSlice";
import UserSlice from "../slices/UserSlice";
import AuthSlice from "../slices/AuthSlice";
import ordersSlice from "../slices/OrdersSlice";
import cartSlice from "../slices/CartSlice";

const store = configureStore({
  reducer: {
    BooksSlice,
    AuthSlice,
    UserSlice,
    ordersSlice,
    cartSlice,
    [BookApi.reducerPath]: BookApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      BookApi.middleware,
      CartApi.middleware,
      OrderApi.middleware,
      UserApi.middleware
    ),
});

export default store;
