import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL || "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    //register
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),
    //login
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    updateAuth: builder.mutation({
      query: ({ authId, updatedAuth }) => ({
        url: `/auth/${authId}`,
        method: "PUT",
        body: updatedAuth,
      }),
    }),
    UserInfo: builder.query({
      query: (token) => ({
        url: "/auth/me",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateAuthMutation,
  useUserInfoQuery,
} = AuthApi;
