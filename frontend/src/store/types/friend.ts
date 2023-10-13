import { IUser } from "./user";

export interface FriendInviation {
  message: string;
  data: {
    newFriendInvitation: IUser;
  };
}
