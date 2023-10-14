import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import { UserPlus2 } from "lucide-react";

import RequestList from "./FriendRequests/RequestList";

interface RequestsProps {}

const Requests: NextPage<RequestsProps> = () => {
  return (
    <>
      <SidebarHeader
        header="Friend Requests"
        icon={<UserPlus2 className="w-4 h-4" />}
      />

      <SidebarWrapper>
        <div className="flex flex-col flex-1 h-full space-y-4 overflow-y-auto scrollbar-none">
          <RequestList requestType="received" />
          <RequestList requestType="sent" />
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Requests;
