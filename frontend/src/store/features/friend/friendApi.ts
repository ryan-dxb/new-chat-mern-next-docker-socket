import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setFriendRequestsSent } from "./friendSlice";
import { FriendInviation } from "@/store/types/friend";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: customFetchBase,
  tagTypes: ["Friend"],
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation<FriendInviation, any>({
      query: (receiver_email: string) => ({
        url: "/friend/send-invite",
        method: "POST",
        body: { receiver_email },
        credentials: "include",
      }),
      invalidatesTags: ["Friend"],

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setFriendRequestsSent(data.data));
          }
        } catch (err) {
          dispatch(friendApi.util.invalidateTags(["Friend"]));
        }
      },
    }),

    acceptFriendRequest: builder.mutation<FriendInviation, any>({
      query: (request_id: string) => ({
        url: "/friend/accept-invite",
        method: "POST",
        body: { request_id },
        credentials: "include",
      }),
      invalidatesTags: ["Friend"],
    }),

    rejectFriendRequest: builder.mutation<FriendInviation, any>({
      query: (request_id: string) => ({
        url: "/friend/reject-invite",
        method: "POST",
        body: { request_id },
        credentials: "include",
      }),
      invalidatesTags: ["Friend"],
    }),

    cancelFriendRequest: builder.mutation<FriendInviation, any>({
      query: (request_id: string) => ({
        url: "/friend/cancel-invite",
        method: "POST",
        body: { request_id },
        credentials: "include",
      }),
      invalidatesTags: ["Friend"],
    }),
  }),
});

export const {
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useCancelFriendRequestMutation,
} = friendApi;
