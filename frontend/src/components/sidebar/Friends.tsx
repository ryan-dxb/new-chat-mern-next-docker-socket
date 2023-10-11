import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Search, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

interface FriendsProps {}

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

const Friends: NextPage<FriendsProps> = () => {
  return (
    <>
      <SidebarHeader header="Friends" icon={<Search className="w-4 h-4" />} />
      <SidebarWrapper>
        <div>
          <SidebarSearch />
        </div>

        <div className="flex flex-col flex-1 p-2 overflow-hidden border">
          <div className="flex-grow-0 h-fit">
            <p>
              <span className="text-xs font-semibold text-muted-foreground">
                Your Friends
              </span>
            </p>
          </div>

          <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
            <div className="flex flex-col flex-1 space-y-3">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between mr-4"
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Avatar className="w-10 h-10 ">
                      <AvatarFallback className="text-xs bg-primary/5">
                        {chat.name.split(" ").map((name) => name[0])}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{chat.name}</p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        Online
                      </p>
                    </div>
                  </div>

                  {/* Online Indicator */}
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Friends;
