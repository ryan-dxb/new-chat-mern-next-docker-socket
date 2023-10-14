import { UserModel } from "./user";

export interface FriendInviation {
  message: string;
  data: FriendRequestType;
}

export interface FriendRequestType {
  request_id: string;
  userDetails: UserModel;
}

export interface AllFriendsResponse {
  message: string;
  data: UserModel[];
}

export interface FriendModel {
  friend_id: string;
  userDetails: UserModel;
}
