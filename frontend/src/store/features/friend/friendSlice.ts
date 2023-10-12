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
      state.friendRequestsSent = [...state.friendRequestsSent, action.payload];
    },
    setFriendRequestsReceived: (state, action) => {
      state.friendRequestsReceived = [
        ...state.friendRequestsReceived,
        action.payload,
      ];
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
} = friendSlice.actions;

export default friendSlice.reducer;
