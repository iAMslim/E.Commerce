import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER || "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().AuthSlice?.token || localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    getMyCart: builder.query({
      query: () => "/cart/my-cart",
      providesTags: ["Cart"],
    }),

    createCart: builder.mutation({
      query: (newCart) => ({
        url: "/cart",
        method: "POST",
        body: newCart,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation({
      query: (bookInCartId) => ({
        url: `/cart/item/${bookInCartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItemQuantity: builder.mutation({
      query: ({ bookInCartId, quantity }) => ({
        url: `/cart/item/${bookInCartId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetMyCartQuery,
  useDeleteCartMutation,
  useCreateCartMutation,
  useUpdateCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemQuantityMutation,
} = CartApi;
