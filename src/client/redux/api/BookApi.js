import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookApi = createApi({
  reducerPath: "BookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER || "http://localhost:3000/api",
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
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => "/books/" + id,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook, token }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
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
