import { createSlice } from "@reduxjs/toolkit";
import { BookApi } from "../api/BookApi";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setBook(state, action) {
      state.book = action.payload;
    },
    clearBook(state) {
      state.book = null;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearSearchQuery(state) {
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      BookApi.endpoints.getAllBooks.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          books: payload, // Assuming payload is an array of books
          loading: false,
          error: null,
        };
      }
    );
  },
});

export const {
  setBooks,
  setBook,
  clearBook,
  setSearchQuery,
  clearSearchQuery,
} = booksSlice.actions;
export const selectSearchQuery = (state) => state.books.searchQuery;
// export const selectBook = (state) => state.books.book;
export default booksSlice.reducer;
