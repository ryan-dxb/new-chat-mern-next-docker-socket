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
  console.log("request", request);

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
              <>
                <User className="w-4 h-4" />
              </>
            )}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">
          {request &&
          request.userDetails.firstName &&
          request.userDetails.lastName
            ? request.userDetails.firstName + " " + request.userDetails.lastName
            : "Unknown"}
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        {requestType === "received" && (
          <>
            <RequestActionButton
              variant="outline"
              icon={<Check className="w-4 h-4" />}
              action="accept"
              request_id={request.request_id!}
            />

            <RequestActionButton
              variant="destructive"
              icon={<X className="w-4 h-4" />}
              action="reject"
              request_id={request.request_id!}
            />
          </>
        )}
        {requestType === "sent" && (
          <RequestActionButton
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
            action="cancel"
            request_id={request.request_id!}
          />
        )}
      </div>
    </div>
  );
};

export default RequestListItem;
