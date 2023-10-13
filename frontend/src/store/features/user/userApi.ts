import customFetchBase from "@/store/api/customBaseQuery";
import { FriendRequests } from "@/store/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setFriendRequests,
  setFriendRequestsReceived,
  setFriendRequestsSent,
  setFriends,
} from "../friend/friendSlice";
import { AllFriendsResponse } from "@/store/types/friend";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User", "FriendRequests", "AllFriends"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User", "AllFriends"],
    }),

    getFriendRequests: builder.query<FriendRequests, any>({
      query: () => ({
        url: "user/friend-requests",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["FriendRequests"],

      // We want to refetch this query every time a mutation is made
      // to the friend requests

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setFriendRequests(data));
          }
        } catch (err) {
          dispatch(userApi.util.invalidateTags(["FriendRequests"]));
        }
      },
    }),

    getFriends: builder.query<AllFriendsResponse, any>({
      query: () => ({
        url: "user/get-friends",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["AllFriends"],

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setFriends(data.data));
          }
        } catch (err) {
          dispatch(userApi.util.invalidateTags(["AllFriends"]));
        }
      },
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
  useGetFriendsQuery,
} = userApi;
