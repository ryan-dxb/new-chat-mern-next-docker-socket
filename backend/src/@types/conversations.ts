import { Request } from "express";

export interface CreateOrFetchConversationRequest extends Request {
  body: {
    friend_id: string;
  };
}

export interface CreateGroupConversationRequest extends Request {
  body: {
    friend_ids: string[];
    groupName: string;
  };
}

export interface AddUserToGroupRequest extends Request {
  body: {
    friend_id: string;
    group_id: string;
  };
}

export interface RemoveUserFromGroupRequest extends Request {
  body: {
    friend_id: string;
    group_id: string;
  };
}
