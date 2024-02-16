import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `/books/${bookId}`,
        method: 'PUT',
        body: updatedBook,
      }),
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, updatedOrder }) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: updatedOrder,
      }),
    }),
    getAllCarts: builder.query({
      query: () => "/cart",
    }),
    getCartById: builder.query({
      query: (id) => `/cart/${id}`,
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
    }),
    createCart: builder.mutation({
      query: (newCart) => ({
        url: '/cart',
        method: 'POST',
        body: newCart,
      }),
    }),
    updateCart: builder.mutation({
      query: ({ cartId, updatedCart }) => ({
        url: `/cart/${cartId}`,
        method: 'PUT',
        body: updatedCart,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),
    register: builder.mutation({
      query: (cred) => ({
        url: "/auth/register",
        method: "POST",
        body: cred,
      }),
    }),
    login: builder.mutation({
      query: (cred) => ({
        url: "/auth/login",
        method: "POST",
        body: cred,
      }),
    }),
    deleteAuth: builder.mutation({
      query: () => ({
        url: "/auth",
        method: "DELETE",
      }),
    }),
    createAuth: builder.mutation({
      query: (newAuth) => ({
        url: '/auth',
        method: 'POST',
        body: newAuth,
      }),
    }),
    updateAuth: builder.mutation({
      query: ({ authId, updatedAuth }) => ({
        url: `/auth/${authId}`,
        method: 'PUT',
        body: updatedAuth,
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
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetAllCartsQuery,
  useGetCartByIdQuery,
  useDeleteCartMutation,
  useCreateCartMutation,
  useUpdateCartMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRegisterMutation,
  useLoginMutation,
  useDeleteAuthMutation,
  useCreateAuthMutation,
  useUpdateAuthMutation,
} = api;
