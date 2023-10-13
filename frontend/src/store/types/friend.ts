import { IUser } from "./user";

export interface FriendInviation {
  message: string;
  data: FriendRequestType;
}

export interface FriendRequestType {
  request_id: string;
  userDetails: FriendModel;
}

export interface AllFriendsResponse {
  message: string;
  data: FriendModel[];
}

export interface FriendModel {
  id?: string;
  friend_id?: string;
  email: string;
  username: string;
  status: string;
  avatar: string;
  firstName: string;
  lastName: string;
}
