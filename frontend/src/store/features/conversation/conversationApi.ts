import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setConversations,
  setNewConversation,
  setSelectedConversation,
} from "./conversationSlice";
import {
  FetchOrCreateConversationResponse,
  GetMessagesResponse,
} from "@/store/types/conversation";
import { RootState } from "@/store/store";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: customFetchBase,
  tagTypes: ["Conversation", "Message"],
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

    getMessages: builder.query<GetMessagesResponse, any>({
      query: (conversation_id: string) => ({
        url: `/message/${conversation_id}`,
        method: "GET",
        credentials: "include",
      }),

      providesTags: ["Message"],
    }),

    sendMessage: builder.mutation<any, any>({
      query: ({ conversation_id, message }: any) => ({
        url: `/message/${conversation_id}`,
        method: "POST",
        body: { message },
        credentials: "include",
      }),
      invalidatesTags: ["Message"],
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
