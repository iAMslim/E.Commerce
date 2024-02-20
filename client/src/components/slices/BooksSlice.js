import { createSlice } from "@reduxjs/toolkit";
import { BookApi } from "../api/BookApi";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      BookApi.endpoints.getAllBooks.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state, products: payload.products
        }}
    )}
    })

export default booksSlice.reducer;


