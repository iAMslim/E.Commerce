import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
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
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, updatedOrder }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: updatedOrder,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = OrderApi;
