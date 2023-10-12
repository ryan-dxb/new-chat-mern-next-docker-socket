"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NextPage } from "next";
import RequestListItem, { SentOrReceived } from "./RequestListItem";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/features/user/userSlice";
import RequestListHeader from "./RequestListHeader";

interface RequestListProps {
  requestType: string;
}

const RequestList: NextPage<RequestListProps> = ({ requestType }) => {
  console.log(requestType);

  const user = useAppSelector(selectUser);
  return (
    <div className="flex-1  max-h-[50%] min-h-[320px] h-full border p-2">
      {requestType === "sent" && (
        <RequestListHeader
          header={`You have ${user?.pendingFriendSentRequests?.length} sent requests`}
        />
      )}

      {requestType === "received" && (
        <RequestListHeader
          header={`You have ${user?.pendingFriendInvitations?.length} received requests`}
        />
      )}
      <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
        <div className="flex flex-col flex-1 space-y-2">
          {requestType === "sent" &&
          user?.pendingFriendSentRequests?.length &&
          user?.pendingFriendSentRequests?.length > 1 ? (
            user?.pendingFriendSentRequests?.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                requestType={SentOrReceived.SENT}
              />
            ))
          ) : (
            <></>
          )}

          {requestType === "received" &&
          user?.pendingFriendInvitations?.length &&
          user?.pendingFriendInvitations?.length > 1 ? (
            user?.pendingFriendInvitations?.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                requestType={SentOrReceived.SENT}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RequestList;
