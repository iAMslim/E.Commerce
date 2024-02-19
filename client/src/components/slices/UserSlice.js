import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../api/UserApi";

const storeUser = (state, { payload }) => {
  state.user = payload; 
  window.sessionStorage.setItem("user", JSON.stringify(payload));
};


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(window.sessionStorage.getItem("user")) || null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(UserApi.endpoints.register.matchFulfilled, storeUser);
    builder.addMatcher(UserApi.endpoints.login.matchFulfilled, storeUser);
  },
});

export default userSlice.reducer;