import customFetchBase from "@/store/api/customBaseQuery";
import { FriendRequests, GetUserResponse } from "@/store/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setAllFriends,
  setFriendRequests,
  setFriendRequestsReceived,
  setFriendRequestsSent,
} from "../friend/friendSlice";
import { AllFriendsResponse } from "@/store/types/friend";
import { setUser } from "./userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User", "FriendRequests", "AllFriends"],
  endpoints: (builder) => ({
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
            dispatch(setAllFriends(data.data));
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

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = (await queryFulfilled).data;

          if (data) {
            dispatch(setUser(data));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetFriendRequestsQuery,
  useGetFriendsQuery,
} = userApi;
