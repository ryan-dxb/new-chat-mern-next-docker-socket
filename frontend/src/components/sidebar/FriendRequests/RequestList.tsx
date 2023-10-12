"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NextPage } from "next";
import RequestListItem from "./RequestListItem";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/features/user/userSlice";
import RequestListHeader from "./RequestListHeader";
import { useGetFriendRequestsQuery } from "@/store/features/user/userApi";

interface RequestListProps {
  requestType: string;
}

const RequestList: NextPage<RequestListProps> = ({ requestType }) => {
  const { data, isFetching, isSuccess, isError } = useGetFriendRequestsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const friendRequestsSent = data?.friendRequestsSent || [];
  const friendRequestsReceived = data?.friendRequestsReceived || [];

  console.log("friendRequestsSent", friendRequestsSent);

  //  Get the list of sent requests and received requests

  return (
    <div className="flex-1  max-h-[50%] min-h-[320px] h-full border p-2">
      {requestType === "sent" && (
        <RequestListHeader
          header={`You have ${friendRequestsSent.length} sent requests`}
        />
      )}

      {requestType === "received" && (
        <RequestListHeader
          header={`You have ${friendRequestsReceived.length} received requests`}
        />
      )}
      <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
        <div className="flex flex-col flex-1 space-y-2">
          {requestType === "sent" &&
            friendRequestsSent.length >= 1 &&
            friendRequestsSent.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                requestType={requestType}
              />
            ))}

          {requestType === "received" &&
            friendRequestsReceived.length >= 1 &&
            friendRequestsReceived.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                requestType={requestType}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RequestList;
