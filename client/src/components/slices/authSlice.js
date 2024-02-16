import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const storeToken = (state, { payload }) => {
  state.credentials = { token: payload.token, user: { ...payload.user } };
  window.sessionStorage.setItem(
    "credentials",
    JSON.stringify({
      token: payload.token,
      user: { ...payload.user },
    })
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials: JSON.parse(window.sessionStorage.getItem("credentials")) || {
      token: "",
      user: {
        userId: null,
      },
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export default authSlice.reducer;