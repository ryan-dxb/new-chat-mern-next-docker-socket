import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";

import { Search, Trash2, UserPlus2 } from "lucide-react";
import FriendsList from "./Friends/FriendsList";

interface FriendsProps {}

const Friends: NextPage<FriendsProps> = () => {
  return (
    <>
      <SidebarHeader
        header="Friends"
        icon={<UserPlus2 className="w-4 h-4" />}
      />
      <SidebarWrapper>
        <div>
          <SidebarSearch />
        </div>

        <div className="flex flex-col flex-1 p-2 overflow-hidden border">
          <FriendsList />
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Friends;
