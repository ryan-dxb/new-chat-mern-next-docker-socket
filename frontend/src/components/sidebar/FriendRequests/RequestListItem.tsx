import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Trash2, X } from "lucide-react";
import { NextPage } from "next";

export enum SentOrReceived {
  SENT = "sent",
  RECEIVED = "received",
}

interface RequestListItemProps {
  request: any;
  requestType: SentOrReceived;
}

const RequestListItem: NextPage<RequestListItemProps> = ({
  request,
  requestType,
}) => {
  return (
    <div key={request.id} className="flex items-center justify-between mr-4">
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="w-9 h-9 ">
          <AvatarFallback className="text-xs bg-primary/5">
            {request.name.split(" ").map((name) => name[0])}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">{request.name}</p>
      </div>
      <div className="flex flex-row space-x-2">
        {requestType === SentOrReceived.RECEIVED && (
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
        {requestType === SentOrReceived.SENT && (
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
