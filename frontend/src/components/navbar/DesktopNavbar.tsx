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
} from "lucide-react";
import NavItem from "./common/NavItem";
import ThemeSwitcher from "./common/ThemeSwitcher";
import { Button } from "../ui/button";
import SettingsModal from "../modals/SettingsModal";

interface DesktopNavbarProps {}

const NavItemList = [
  {
    id: 2,
    icon: <MessagesSquare className="w-6 h-6 rounded-full" />,
    name: "Chats",
  },
  {
    id: 2,
    icon: <Users2 className="w-6 h-6 rounded-full" />,
    name: "Groups",
  },
  {
    id: 3,
    icon: <User2 className="w-6 h-6 rounded-full" />,
    name: "Contacts",
  },
];

const DesktopNavbar: NextPage<DesktopNavbarProps> = () => {
  return (
    <nav className="w-20 min-w-[80px] bg-primary-foreground dark:bg-primary-foreground/10 border-r-[0.5px] shadow-2xl border-r-slate-800/10">
      <div className="flex flex-col items-center justify-between h-screen py-4 ">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
          <MessageCircle className="w-6 h-6 text-white rounded-full" />
        </div>

        <ul className="space-y-6">
          {NavItemList.map((item) => (
            <NavItem key={item.id} icon={item.icon} name={item.name} />
          ))}
        </ul>

        <div className="space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
            <ThemeSwitcher />
          </div>

          <div className="flex items-center justify-center">
            <SettingsModal>
              <Button variant="ghost" className="w-12 h-12 p-2 rounded-full">
                <Settings className="w-6 h-6 text-muted-foreground" />
              </Button>
            </SettingsModal>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
