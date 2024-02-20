// import { createSlice } from "@reduxjs/toolkit";
// import { UserApi } from "../api/UserApi";

// const storeToken = (state, { payload }) => {
//   state.credentials = { token: payload.token, user: { ...payload.user } };
//   window.sessionStorage.setItem(
//     "credentials",
//     JSON.stringify({
//       token: payload.token,
//       user: { ...payload.user },
//     })
//   );
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     credentials: JSON.parse(window.sessionStorage.getItem("credentials")) || {
//       token: "",
//       user: {
//         userId: null,
//       },
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(UserApi.endpoints.register.matchFulfilled, storeToken);
//     builder.addMatcher(UserApi.endpoints.login.matchFulfilled, storeToken);
//   },
// });
// export default authSlice.reducer;

// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      const { token, user, isAdmin } = action.payload;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      window.sessionStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAdmin = false;
      window.sessionStorage.removeItem("token");
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
