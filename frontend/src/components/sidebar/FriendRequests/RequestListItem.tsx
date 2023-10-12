import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/store/types/user";
import { Check, Trash2, User, X } from "lucide-react";
import { NextPage } from "next";

interface RequestListItemProps {
  request: IUser;
  requestType: string;
}

const RequestListItem: NextPage<RequestListItemProps> = ({
  request,
  requestType,
}) => {
  console.log("request", request);

  return (
    <div key={request.id} className="flex items-center justify-between mr-4">
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="w-9 h-9 ">
          <AvatarFallback className="text-xs bg-primary/5">
            {request && request.firstName && request.lastName ? (
              <>{request.firstName[0] + request.lastName[0]}</>
            ) : (
              <>
                <User className="w-4 h-4" />
              </>
            )}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">
          {request && request.firstName && request.lastName
            ? request.firstName + " " + request.lastName
            : "Unknown"}
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        {requestType === "received" && (
          <>
            <Button variant="outline" className="w-8 h-8 rounded-full">
              <span>
                <Check className="w-4 h-4" />
              </span>
            </Button>

            <Button variant="destructive" className="w-8 h-8 rounded-full">
              <span>
                <X className="w-4 h-4" />
              </span>
            </Button>
          </>
        )}
        {requestType === "sent" && (
          <Button variant="destructive" className="w-8 h-8 rounded-full">
            <span>
              <Trash2 className="w-4 h-4" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RequestListItem;
