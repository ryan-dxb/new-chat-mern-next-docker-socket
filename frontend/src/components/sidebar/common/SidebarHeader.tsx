import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { NextPage } from "next";

interface SidebarHeaderProps {
  header: string;
  icon?: React.ReactNode;
}

const SidebarHeader: NextPage<SidebarHeaderProps> = ({ header, icon }) => {
  return (
    <div className="flex items-center justify-between border-b-[1px] h-20 p-4 shadow-sm">
      <h1 className="text-lg font-medium">{header}</h1>

      <Button variant="outline" className="w-10 h-10 rounded-full">
        <span className="text-muted-foreground">{icon}</span>
      </Button>
    </div>
  );
};

export default SidebarHeader;
