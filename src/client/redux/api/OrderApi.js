import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
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
    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
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
    checkout: builder.mutation({
      query: () => ({
        url: "/orders/checkout",
        method: "POST",
      }),
      invalidatesTags: ["Cart"], // THIS LINE
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useCheckoutMutation,
  useGetMyOrdersQuery,
} = OrderApi;
