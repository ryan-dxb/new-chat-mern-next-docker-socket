import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setConversations,
  setNewConversation,
  setSelectedConversation,
} from "./conversationSlice";
import { FetchOrCreateConversationResponse } from "@/store/types/conversation";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: customFetchBase,
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    getOrCreateConversation: builder.mutation<
      FetchOrCreateConversationResponse,
      any
    >({
      query: (friend_id: string) => ({
        url: "/conversation/create-fetch-direct-conversation",
        method: "POST",
        body: { friend_id },
        credentials: "include",
      }),

      invalidatesTags: ["Conversation"],

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          console.log(data.data);

          if (data) {
            await dispatch(setNewConversation(data.data.conversation));
            await dispatch(setSelectedConversation(data.data.conversation));
          }
        } catch (error) {}
      },
    }),

    getMessages: builder.query<any, any>({
      query: (conversation_id: string) => ({
        url: `/conversation/${conversation_id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Conversation"],
    }),

    sendMessage: builder.mutation<any, any>({
      query: ({ conversation_id, message }: any) => ({
        url: `/conversation/${conversation_id}`,
        method: "POST",
        body: { message },
        credentials: "include",
      }),
      invalidatesTags: ["Conversation"],
    }),

    getAllConversations: builder.query<any, any>({
      query: () => ({
        url: "/conversation",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Conversation"],

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setConversations(data.data.conversations));
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetOrCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAllConversationsQuery,
} = conversationApi;
