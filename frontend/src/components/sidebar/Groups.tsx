import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";
import { Check, Trash2, UserPlus2, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

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
          <div className="flex-1  max-h-[50%] min-h-[320px] h-full border p-2">
            <div className="flex-grow-0 h-fit">
              <p>
                <span className="text-xs font-semibold text-muted-foreground">
                  You have {chats.length} pending friend requests
                </span>
              </p>
            </div>

            <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
              <div className="flex flex-col flex-1 space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between mr-4"
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <Avatar className="w-9 h-9 ">
                        <AvatarFallback className="text-xs bg-primary/5">
                          {chat.name.split(" ").map((name) => name[0])}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-semibold">{chat.name}</p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <Button
                        variant="outline"
                        className="w-8 h-8 rounded-full"
                      >
                        <span>
                          <Check className="w-4 h-4" />
                        </span>
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-8 h-8 rounded-full"
                      >
                        <span>
                          <X className="w-4 h-4" />
                        </span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1  max-h-[50%] min-h-[320px] h-full border p-2">
            <div className="flex-grow-0 h-fit">
              <p>
                <span className="text-xs font-semibold text-muted-foreground">
                  You have {chats.length} friend requests sent
                </span>
              </p>
            </div>

            <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
              <div className="flex flex-col flex-1 space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between mr-4"
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <Avatar className="w-9 h-9 ">
                        <AvatarFallback className="text-xs bg-primary/5">
                          {chat.name.split(" ").map((name) => name[0])}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-semibold">{chat.name}</p>
                    </div>
                    <div className="flex flex-row space-x-2">
                      <Button
                        variant="destructive"
                        className="w-8 h-8 rounded-full"
                      >
                        <span>
                          <Trash2 className="w-4 h-4" />
                        </span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default Groups;
