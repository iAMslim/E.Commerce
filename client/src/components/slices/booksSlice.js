import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const booksSlice = createSlice({
  name: "books",
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAllBooks.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default booksSlice.reducer;