import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../types/user";

interface UserState {
  userDetails: IUser;
  token: string;
}

const initialState: UserState = {
  userDetails: {
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    friends: [],
    status: "",
    isEmailVerified: false,
    isAccountActive: false,
    pendingFriendInvitations: [],
    pendingFriendSentRequests: [],
  },
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser action", action);

      state.userDetails = action.payload.user;
      state.token = action.payload.accessToken;
    },
    setToken: (state, action) => {
      console.log("setToken action", action);

      state.token = action.payload.accessToken;
    },

    logout: () => {
      return initialState;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.userDetails;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
