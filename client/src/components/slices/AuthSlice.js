import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { users: null, token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      builder.addMatcher(
        AuthApi.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          console.log(payload)
          state.users = payload.user
          state.token = payload.toekn
        }
      )
      builder.addMatcher(
        AuthApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.users = payload.user;
          state.token = payload.token;
          console.log(state.users);
          console.log(state.token);
        }
      ),
      builder.addMatcher(
        AuthApi.endpoints.UserInfo.matchFulfilled,
        (state, { payload }) => {
          console.log(payload);
          return { ...state, users: payload };
        }
      );
  }},
})

export default authSlice.reducer;
export const { setToken } = authSlice.actions;

