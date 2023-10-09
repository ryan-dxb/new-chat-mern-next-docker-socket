import { MessageCircle } from "lucide-react";
import { NextPage } from "next";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: NextPage<SidebarWrapperProps> = ({ children }) => {
  return <div className="flex flex-col h-screen p-4">{children}</div>;
};

export default SidebarWrapper;
