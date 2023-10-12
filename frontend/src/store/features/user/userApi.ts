import customFetchBase from "@/store/api/customBaseQuery";
import { FriendRequests } from "@/store/types/user";
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

    getFriendRequests: builder.query<FriendRequests, any>({
      query: () => ({
        url: "user/friend-requests",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],

      // We want to refetch this query every time a mutation is made
      // to the friend requests
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

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useGetFriendRequestsQuery,
} = userApi;
