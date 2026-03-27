import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../api/UserApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        return { ...state, user: payload };
      }
    );
    builder.addMatcher(
      UserApi.endpoints.getUserById.matchFulfilled,
      (state, { payload }) => {
        return { ...state, user: payload };
      }
    );
    builder.addMatcher(
      UserApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        state.users = state.users.map((user) => {
          if (user.id === payload.user.id) {
            return payload.user;
          }
          return user;
        });
        return state;
      }
    );
  },
});

export default userSlice.reducer;
