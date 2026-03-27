import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER || "http://localhost:3000/api",
  }),

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),

    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/users/${userId}`,
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
