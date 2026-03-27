import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../api/AuthApi";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    users: [],
    user: null,
    token: null,
    userId: 54, // Add userId to the initial state
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.user;
        state.token = payload.token;
        state.userId = payload.userId; // Assuming userId is returned from the registerUser endpoint
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.userId = payload.userId; // Assuming userId is returned from the loginUser endpoint
      }
    );
    builder.addMatcher(
      AuthApi.endpoints.userInfo.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.userId = payload.userId; // Assuming userId is included in the userInfo payload
      }
    );
  },
});

export default authSlice.reducer;
export const { setToken, setUserId } = authSlice.actions;
