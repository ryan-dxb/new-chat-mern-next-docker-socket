import customFetchBase from "@/store/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: customFetchBase,
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    getOrCreateConversation: builder.mutation<any, any>({
      query: (friend_id: string) => ({
        url: "/conversation/create-fetch-direct-conversation",
        method: "POST",
        body: { friend_id },
        credentials: "include",
      }),
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

      // onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      //   try {
      //     const result = await queryFulfilled;
      //     const { data } = result;
      //     const { conversations } = data;

      //     const conversation_ids = conversations.map(
      //       (conversation: any) => conversation._id
      //     );

      //     dispatch(
      //       conversationApi.util.updateQueryData("getMessages", undefined, (
      //         oldData: any
      //       ) => {
      //         if (oldData) {
      //           const newMessages: any = {};
      //           conversation_ids.forEach((conversation_id: string) => {
      //             newMessages[conversation_id] = [];
      //           });
      //           return { ...oldData, ...newMessages };
      //         }
      //       })
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }),
  }),
});

export const {
  useGetOrCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAllConversationsQuery,
} = conversationApi;
