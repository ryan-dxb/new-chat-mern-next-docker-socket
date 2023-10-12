import { MessageCircle, Search } from "lucide-react";
import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface ChatsProps {}

const favouriteChats = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "John Smith",
  },
  {
    id: 4,
    name: "Kalle Karlsson",
  },
  {
    id: 5,
    name: "Karl Karlsson",
  },
];

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
];

const Chats: NextPage<ChatsProps> = () => {
  return (
    <>
      <SidebarHeader header="Chats" />
      <SidebarWrapper>
        <SidebarSearch />
        {/* Chat List */}
        <div className="flex flex-col mt-4 space-y-6 overflow-x-auto">
          {/* chat list Favourites*/}

          <div>
            <p>
              <span className="text-sm font-semibold">Active Chats</span>
            </p>

            <div className="flex flex-col mt-3 space-y-2">
              {favouriteChats.map((chat) => (
                <div key={chat.id} className="flex items-center space-x-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/5">
                      {chat.name.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">{chat.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* chat list Recent*/}
          <div>
            <p>
              <span className="text-sm font-semibold">Friend List</span>
            </p>

            <div className="flex flex-col mt-3 space-y-2">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center space-x-2">
                  <Avatar className="w-10 h-10 ">
                    <AvatarFallback className="bg-primary/5">
                      {chat.name.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-semibold">{chat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Chats;
