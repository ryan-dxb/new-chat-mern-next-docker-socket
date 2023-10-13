import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../types/user";

interface FriendState {
  friends: IUser[];
  friendRequestsSent: IUser[];
  friendRequestsReceived: IUser[];
  onlineFriends: IUser[];
}

const initialState: FriendState = {
  friends: [],
  friendRequestsSent: [],
  friendRequestsReceived: [],
  onlineFriends: [],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      // Push the new friend to the friends array
      state.friends = [...state.friends, action.payload];
    },
    setFriendRequestsSent: (state, action) => {
      console.log("action.payload", action.payload);

      state.friendRequestsSent = [
        ...state.friendRequestsSent,
        action.payload.data.newFriendInvitation,
      ];
    },
    setFriendRequestsReceived: (state, action) => {
      state.friendRequestsReceived = [
        ...state.friendRequestsReceived,
        action.payload,
      ];
    },

    removeFriendRequestSent: (state, action) => {
      state.friendRequestsSent = state.friendRequestsSent.filter(
        (friend) => friend.id !== action.payload
      );
    },

    removeFriendRequestReceived: (state, action) => {
      state.friendRequestsReceived = state.friendRequestsReceived.filter(
        (friend) => friend.id !== action.payload
      );
    },

    setFriendRequests: (state, action) => {
      // Push the new friend to the friends array
      state.friendRequestsReceived = action.payload.friendRequestsReceived;
      state.friendRequestsSent = action.payload.friendRequestsSent;
    },

    setOnlineFriends: (state, action) => {
      state.onlineFriends = [...state.onlineFriends, action.payload];
    },
  },
});

export const {
  setFriends,
  setFriendRequestsSent,
  setFriendRequestsReceived,
  setOnlineFriends,
  setFriendRequests,
  removeFriendRequestSent,
  removeFriendRequestReceived,
} = friendSlice.actions;

export const selectFriends = (state: RootState) => state.friend.friends;
export const selectFriendRequestsSent = (state: RootState) =>
  state.friend.friendRequestsSent;

export const selectFriendRequestsReceived = (state: RootState) =>
  state.friend.friendRequestsReceived;

export const selectOnlineFriends = (state: RootState) =>
  state.friend.onlineFriends;

export const selectFriendRequests = (state: RootState) => ({
  friendRequestsReceived: state.friend.friendRequestsReceived,
  friendRequestsSent: state.friend.friendRequestsSent,
});

export default friendSlice.reducer;
