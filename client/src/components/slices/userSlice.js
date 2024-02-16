import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

// Define a reducer function to store user data in state and session storage
const storeUser = (state, { payload }) => {
  state.user = payload; // Assuming the payload contains the user object
  window.sessionStorage.setItem("user", JSON.stringify(payload));
};

// Create a slice for managing user authentication
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(window.sessionStorage.getItem("user")) || null,
  },
  extraReducers: (builder) => {
    // Add extra reducers to handle actions dispatched by API endpoints
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeUser);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeUser);
  },
});

export default userSlice.reducer;