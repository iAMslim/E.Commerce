import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  "http://localhost:3000",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    // },
  }),

  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "api/orders",
    }),
    getOrderById: builder.query({
      query: (id) => `api/orders/${id}`,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `api/orders/${id}`,
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "api/orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, updatedOrder }) => ({
        url: `api/orders/${orderId}`,
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
