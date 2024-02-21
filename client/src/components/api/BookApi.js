import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookApi = createApi({
  reducerPath: "BookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers
    // },
  }),

  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "api/books",
    }),
    getBookById: builder.query({
      query: (id) => "api/books/" + id,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `api/books/${id}`,
        method: "DELETE",
      }),
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "api/books",
        method: "POST",
        body: newBook,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook, token }) => ({
        url: `api/books/${bookId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: updatedBook,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
} = BookApi;
