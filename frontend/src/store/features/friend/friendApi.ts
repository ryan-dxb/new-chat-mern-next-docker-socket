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
            dispatch(setFriendRequestsSent(data));
          }
        } catch (err) {
          dispatch(friendApi.util.invalidateTags(["Friend"]));
        }
      },
    }),
  }),
});

export const { useSendFriendRequestMutation } = friendApi;
