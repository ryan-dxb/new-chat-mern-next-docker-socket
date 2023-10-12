import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Check, Trash2, UserPlus2, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import RequestList from "./FriendRequests/RequestList";
import { SentOrReceived } from "./FriendRequests/RequestListItem";

interface GroupsProps {}

const chats = [
  {
    id: 1,
    name: "Dirk Nowitzki",
  },
  {
    id: 2,
    name: "Steve Nash",
  },
  {
    id: 3,
    name: "Jason Kidd",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
  {
    id: 4,
    name: "Kobe Bryant",
  },
];

const Groups: NextPage<GroupsProps> = () => {
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

export default Groups;
