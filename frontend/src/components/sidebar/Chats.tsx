import { MessageCircle, Search, UserPlus2 } from "lucide-react";
import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import FriendsList from "./Friends/FriendsList";
import ChatList from "./Chats/ChatList";

interface ChatsProps {}

const Chats: NextPage<ChatsProps> = () => {
  return (
    <>
      <SidebarHeader header="Chats" />
      <SidebarWrapper>
        <div>
          <SidebarSearch />
        </div>

        <div className="flex flex-col flex-1 p-2 overflow-hidden border">
          <ChatList />
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Chats;
