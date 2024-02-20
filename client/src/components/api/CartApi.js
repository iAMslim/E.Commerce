import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "CartApi",
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
  getAllCarts: builder.query({
    query: () => "api/cart",
  }),
  getCartById: builder.query({
    query: (id) => `api/cart/${id}`,
  }),
  deleteCart: builder.mutation({
    query: (id) => ({
      url: `api/cart/${id}`,
      method: "DELETE",
    }),
  }),
  createCart: builder.mutation({
    query: (newCart) => ({
      url: "api/cart",
      method: "POST",
      body: newCart,
    }),
  }),
  updateCart: builder.mutation({
    query: ({ cartId, updatedCart }) => ({
      url: `api/cart/${cartId}`,
      method: "PUT",
      body: updatedCart,
    }),
  }),
})
})

export const {
  useGetAllCartsQuery,
  useGetCartByIdQuery,
  useDeleteCartMutation,
  useCreateCartMutation,
  useUpdateCartMutation,
} = CartApi;
