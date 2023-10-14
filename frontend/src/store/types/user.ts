export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  friends?: IUser[];
  status: string;
  isEmailVerified?: boolean;
  isAccountActive?: boolean;
  pendingFriendInvitations?: string[];
  pendingFriendSentRequests?: string[];
  request_id?: string;
}

export interface FriendRequests {
  friendRequestsSent: IUser[];
  friendRequestsReceived: IUser[];
}

export interface UserModel {
  id: string;
  email: string;
  username: string;
  status: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface GetUserResponse {
  message: string;
  data: {
    user: UserModel;
  };
}
