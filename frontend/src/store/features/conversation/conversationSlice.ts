import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  conversations: [],
  selectedConversation: {},
  messages: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
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
} = conversationSlice.actions;

export const selectConversations = (state: RootState) =>
  state.conversation.conversations;

export const selectSelectedConversation = (state: RootState) =>
  state.conversation.selectedConversation;

export const selectMessages = (state: RootState) => state.conversation.messages;

export default conversationSlice.reducer;
