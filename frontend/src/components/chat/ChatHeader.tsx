"use client";

import { NextPage } from "next";
import { Search, Phone, Video, User, MoreVertical, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedConversation } from "@/store/features/conversation/conversationSlice";
import { selectUser } from "@/store/features/user/userSlice";

interface ChatHeaderProps {}

const ChatHeader: NextPage<ChatHeaderProps> = () => {
  const selectedChat = useAppSelector(selectSelectedConversation);

  const user = useAppSelector(selectUser);
  const usersInConversation = selectedChat.users;

  const friend = usersInConversation.find(
    (userInConvo) => userInConvo.id !== user.id
  );

  return (
    <div className="flex flex-row items-center h-20 px-4 border-b-[1px] shadow-sm">
      <div className="flex flex-row justify-between flex-1 ">
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10 ">
            <AvatarFallback className="bg-primary/5">
              {friend && friend.firstName && friend.lastName ? (
                <>{friend.firstName[0] + friend.lastName[0]}</>
              ) : (
                <>{friend && friend?.username[0] + friend?.username[1]}</> ?? (
                  <User className="w-4 h-4" />
                )
              )}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">
            <span className="font-semibold">
              {friend && friend.firstName && friend.lastName
                ? friend.firstName + " " + friend.lastName
                : friend?.username ?? "Unknown"}
            </span>
          </p>
        </div>

        <div>
          <ul className="flex flex-row items-center space-x-2">
            <li className="flex items-center justify-center w-10 h-10 rounded-full ">
              <Button variant="ghost" className="w-10 h-10 p-2 rounded-full">
                <Search className="w-6 h-6 text-muted-foreground" />
              </Button>
            </li>
            <li className="flex items-center justify-center w-10 h-10 rounded-full ">
              <Button variant="ghost" className="w-10 h-10 p-2 rounded-full">
                <Phone className="w-6 h-6 text-muted-foreground" />
              </Button>
            </li>
            <li className="flex items-center justify-center w-10 h-10 rounded-full ">
              <Button variant="ghost" className="w-10 h-10 p-2 rounded-full">
                <Video className="w-6 h-6 text-muted-foreground" />
              </Button>
            </li>
            <li className="flex items-center justify-center w-10 h-10 rounded-full ">
              <Button variant="ghost" className="w-10 h-10 p-2 rounded-full">
                <User className="w-6 h-6 text-muted-foreground" />
              </Button>
            </li>
            <li className="relative flex items-center justify-center w-10 h-10 rounded-full ">
              <Popover>
                <PopoverTrigger className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent">
                  <MoreVertical className="w-6 h-6 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent className="absolute right-0 flex flex-col w-40 space-y-4 top-3">
                  <button className="flex flex-row items-center justify-between text-sm">
                    <p>Call</p>
                    <Trash2 className="w-4 h-4 text-primary/80" />
                  </button>
                  <button className="flex flex-row items-center justify-between text-sm">
                    <p>Delete</p>
                    <Trash2 className="w-4 h-4 text-primary/80" />
                  </button>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
