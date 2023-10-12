export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  friends: string[];
  status: string;
  isEmailVerified: boolean;
  isAccountActive: boolean;
  pendingFriendInvitations: string[];
  pendingFriendSentRequests: string[];
}