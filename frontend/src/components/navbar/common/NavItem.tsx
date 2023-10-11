"use client";

import { NextPage } from "next";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectOpenTab,
  setOpenTab,
} from "@/store/features/sidebar/sidebarSlice";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: JSX.Element;
  name: string;
}

const NavItem: NextPage<NavItemProps> = ({ icon, name }) => {
  const dispatch = useAppDispatch();
  const openTab = useAppSelector(selectOpenTab);

  return (
    <li
      className={cn(
        "flex w-12 h-12 cursor-pointer rounded-full text-muted-foreground  hover:text-white  font-light  items-center justify-center  hover:bg-blue-600 transition-colors duration-200 ease-in-out",

        openTab === name && "bg-blue-500 text-white"
      )}
      onClick={() => dispatch(setOpenTab(name))}
    >
      {icon}
    </li>
  );
};

export default NavItem;
