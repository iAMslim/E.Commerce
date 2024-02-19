import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    fetchAllBooks.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      };
    fetchAllBooks.fulfilled,
      (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
      };
    fetchAllBooks.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      };
    fetchBookById.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      };
    fetchBookById.fulfilled,
      (state, action) => {
        state.loading = false;
        state.book = action.payload.book;
      };
    fetchBookById.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      };
    createNewBook.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      };
    createNewBook.fulfilled,
      (state, action) => {
        state.loading = false;
        state.book = action.payload.book;
      };
    createNewBook.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      };
  },
});

export default booksSlice.reducer;

export const fetchAllBooks = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/books");
    dispatch(fetchAllBooks.fulfilled(response.data));
  } catch (error) {
    dispatch(fetchAllBooks.rejected(error));
  }
};

export const fetchBookById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/books/${id}`);
    dispatch(fetchBookById.fulfilled(response.data));
  } catch (error) {
    dispatch(fetchBookById.rejected(error));
  }
};

export const createNewBook = (newBook) => async (dispatch) => {
  try {
    const response = await axios.post("/api/books", newBook);
    dispatch(createNewBook.fulfilled(response.data));
  } catch (error) {
    dispatch(createNewBook.rejected(error));
  }
};
