import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } =
  userApi;
