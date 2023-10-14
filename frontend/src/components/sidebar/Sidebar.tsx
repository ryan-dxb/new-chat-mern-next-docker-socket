"use client";

import { NextPage } from "next";
import { useAppSelector } from "@/store/hooks";
import { selectOpenTab } from "@/store/features/sidebar/sidebarSlice";
import Chats from "./Chats";
import Friends from "./Friends";
import Requests from "./Requests";

interface SidebarProps {}

const Sidebar: NextPage<SidebarProps> = () => {
  const openedTab = useAppSelector(selectOpenTab);

  const renderSidebarContent = () => {
    switch (openedTab) {
      case "Chats":
        return <Chats />;
      case "Requests":
        return <Requests />;
      case "Friends":
        return <Friends />;

      default:
        return <Chats />;
    }
  };

  return (
    <div className="min-w-[320px] max-w-[320px] border-r border-gray-50 shadow-md flex flex-col">
      {renderSidebarContent()}
    </div>
  );
};

export default Sidebar;
