import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/api/users",
    }),

    getUserById: builder.query({
      query: (id) => `/api/users/${id}`,
    }),

    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/api/users/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = UserApi;

// deleteUser: builder.mutation({
// query: (id) => ({
//   url: `/api/users/${id}`,
//   method: "DELETE",
// }),
// }),
// deleteAuth: builder.mutation({
//   query: () => ({
//     url: "/auth",
//     method: "DELETE",
//   }),
// }),
