"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/store/types/user";
import { Check, Trash2, User, X } from "lucide-react";
import { NextPage } from "next";
import RequestActionButton from "./RequestActionButton";
import { FriendRequestType } from "@/store/types/friend";

interface RequestListItemProps {
  request: FriendRequestType;
  requestType: string;
}

const RequestListItem: NextPage<RequestListItemProps> = ({
  request,
  requestType,
}) => {
  return (
    <div
      key={request.request_id}
      className="flex items-center justify-between mr-4"
    >
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="w-9 h-9 ">
          <AvatarFallback className="text-xs bg-primary/5">
            {request &&
            request.userDetails.firstName &&
            request.userDetails.lastName ? (
              <>
                {request.userDetails.firstName[0] +
                  request.userDetails.lastName[0]}
              </>
            ) : (
              (request &&
                request?.userDetails?.username[0] +
                  request?.userDetails?.username[1]) ?? (
                <User className="w-4 h-4" />
              )
            )}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">
          {request &&
          request.userDetails.firstName &&
          request.userDetails.lastName ? (
            <>
              {request.userDetails.firstName +
                " " +
                request.userDetails.lastName}
            </>
          ) : (
            (request && request?.userDetails?.username) ?? "Unknown"
          )}
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        {requestType === "received" && (
          <>
            <RequestActionButton
              variant="outline"
              icon={<Check className="w-4 h-4" />}
              action="accept"
              request={request}
            />

            <RequestActionButton
              variant="destructive"
              icon={<X className="w-4 h-4" />}
              action="reject"
              request={request}
            />
          </>
        )}
        {requestType === "sent" && (
          <RequestActionButton
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
            action="cancel"
            request={request}
          />
        )}
      </div>
    </div>
  );
};

export default RequestListItem;
