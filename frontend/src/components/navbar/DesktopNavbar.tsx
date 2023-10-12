"use client";
import { NextPage } from "next";
import {
  MessageCircle,
  MessagesSquare,
  User2,
  Users2,
  Settings2,
  UserCog,
  Settings,
  UserPlus2,
} from "lucide-react";
import NavItem from "./common/NavItem";
import ThemeSwitcher from "./common/ThemeSwitcher";
import { Button, buttonVariants } from "../ui/button";
import SettingsModal from "../modals/SettingsModal";
import Link from "next/link";

interface DesktopNavbarProps {}

const NavItemList = [
  {
    id: 1,
    icon: <MessagesSquare className="w-6 h-6 rounded-full" />,
    name: "Chats",
  },
  {
    id: 2,
    icon: <Users2 className="w-6 h-6 rounded-full" />,
    name: "Requests",
  },
  {
    id: 3,
    icon: <User2 className="w-6 h-6 rounded-full" />,
    name: "Friends",
  },
];

const DesktopNavbar: NextPage<DesktopNavbarProps> = () => {
  return (
    <nav className="w-20 min-w-[80px] border-r border-gray-50 shadow-md">
      <div className="flex flex-col items-center justify-between h-screen py-4 ">
        <div className="flex w-12 h-12 p-0 transition-colors duration-200 ease-in-out bg-blue-500 rounded-full cursor-pointer">
          <Link
            href="/"
            className="flex items-center justify-center w-full h-full"
          >
            <MessageCircle className="w-6 h-6 text-white " />
          </Link>
        </div>

        <ul className="space-y-6">
          {NavItemList.map((item) => (
            <NavItem key={item.id} icon={item.icon} name={item.name} />
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <SettingsModal>
            <Button variant="outline" className="w-12 h-12 p-2 rounded-full">
              <Settings className="w-6 h-6 text-muted-foreground" />
            </Button>
          </SettingsModal>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
