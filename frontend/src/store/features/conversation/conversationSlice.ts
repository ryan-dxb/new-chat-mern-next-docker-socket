import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ConversationModel } from "@/store/types/conversation";
import { MessageModel } from "@/store/types/message";

interface ConversationState {
  conversations: ConversationModel[];
  selectedConversation: ConversationModel;
  messages: MessageModel[];
}

const initialState: ConversationState = {
  conversations: [],
  selectedConversation: {
    conversation_id: "",
    isGroup: false,
    users: [],
    latestMessage: {
      createdAt: "",
      files: [],
      message: "",
      message_id: "",
      sender: {
        id: "",
        avatar: "",
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        status: "",
      },
    },
  },
  messages: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setNewConversation: (state, action) => {
      // First check if the conversation already exists
      const isConversationExists = state.conversations.filter(
        (conversation) =>
          conversation.conversation_id === action.payload.conversation_id
      );

      if (isConversationExists.length === 0) {
        state.conversations = [...state.conversations, action.payload];
      }
    },
    setSelectedConversation: (state, action) => {
      console.log("action.payload", action.payload);

      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      [...state.messages, action.payload];
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
  setNewConversation,
} = conversationSlice.actions;

export const selectConversations = (state: RootState) =>
  state.conversation.conversations;

export const selectSelectedConversation = (state: RootState) =>
  state.conversation.selectedConversation;

export const selectMessages = (state: RootState) => state.conversation.messages;

export default conversationSlice.reducer;
