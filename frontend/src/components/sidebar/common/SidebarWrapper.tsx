import { MessageCircle } from "lucide-react";
import { NextPage } from "next";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: NextPage<SidebarWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 h-full p-4 overflow-hidden ">
      {children}
    </div>
  );
};

export default SidebarWrapper;
