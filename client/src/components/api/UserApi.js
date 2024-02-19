import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
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
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/users/${userId}`,
        method: "PUT",
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
        url: "/auth",
        method: "POST",
        body: newAuth,
      }),
    }),
    updateAuth: builder.mutation({
      query: ({ authId, updatedAuth }) => ({
        url: `/auth/${authId}`,
        method: "PUT",
        body: updatedAuth,
      }),
    }),
  }),
});

export const {
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
} = UserApi;
