import customFetchBase from "@/store/api/customBaseQuery";
import { FriendRequests } from "@/store/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setFriendRequests,
  setFriendRequestsReceived,
  setFriendRequestsSent,
} from "../friend/friendSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User", "FriendRequests"],
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
