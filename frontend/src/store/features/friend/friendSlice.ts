import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserModel } from "../../types/user";
import { FriendModel, FriendRequestType } from "@/store/types/friend";

interface FriendState {
  friends: FriendModel[];
  friendRequestsSent: FriendRequestType[];

  friendRequestsReceived: FriendRequestType[];

  onlineFriends: UserModel[];
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
    setAllFriends: (state, action) => {
      state.friends = [...action.payload];
    },
    setFriendRequestsSent: (
      state,
      action: {
        payload: FriendRequestType;
      }
    ) => {
      const { request_id, userDetails } = action.payload;

      state.friendRequestsSent = [
        ...state.friendRequestsSent, // Keep the old requests
        {
          request_id: request_id,
          userDetails: userDetails,
        },
      ];
    },
    setFriendRequestsReceived: (
      state,
      action: {
        payload: FriendRequestType;
      }
    ) => {
      const { request_id, userDetails } = action.payload;

      state.friendRequestsReceived = [
        ...state.friendRequestsReceived, // Keep the old requests
        {
          request_id: request_id,
          userDetails: userDetails,
        },
      ];
    },

    removeFriendRequestSent: (state, action) => {
      console.log("action.payload", action.payload);

      state.friendRequestsSent = state.friendRequestsSent.filter(
        (request) => request.request_id !== action.payload
      );
    },

    removeFriendRequestReceived: (state, action) => {
      console.log("action.payload", action.payload);

      state.friendRequestsReceived = state.friendRequestsReceived.filter(
        (request) => request.request_id !== action.payload
      );
    },

    setFriendRequests: (state, action) => {
      // Push the new friend to the friends array
      state.friendRequestsReceived = action.payload.friendRequestsReceived;
      state.friendRequestsSent = action.payload.friendRequestsSent;
    },

    setFriend: (state, action) => {
      // Push the new friend to the friends array
      state.friends = [...state.friends, action.payload];
    },

    setOnlineFriends: (state, action) => {
      state.onlineFriends = [...state.onlineFriends, action.payload];
    },
  },
});

export const {
  setAllFriends,
  setFriend,
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

// Get friend request by id
export const selectFriendRequestsReceivedById =
  (request_id: string) => (state: RootState) => {
    return state.friend.friendRequestsSent.find(
      (request) => request.request_id === request_id
    );
  };

export default friendSlice.reducer;
