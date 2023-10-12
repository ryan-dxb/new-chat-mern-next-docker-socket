import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: customFetchBase,
  tagTypes: ["Friend"],
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation({
      query: (receiver_email) => ({
        url: "/friend/send-invite",
        method: "POST",
        body: { receiver_email },
        credentials: "include",
      }),
      invalidatesTags: ["Friend"],
    }),
  }),
});

export const { useSendFriendRequestMutation } = friendApi;
