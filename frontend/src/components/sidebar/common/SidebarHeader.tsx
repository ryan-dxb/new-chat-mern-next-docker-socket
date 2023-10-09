import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { NextPage } from "next";

interface SidebarHeaderProps {
  header: string;
}

const SidebarHeader: NextPage<SidebarHeaderProps> = ({ header }) => {
  return (
    <div className="flex items-center justify-between py-2 min-h-[64px]">
      <h1 className="text-xl font-medium">{header}</h1>

      <Button variant="ghost" className="w-12 h-12 p-2 rounded-full">
        <MessageCircle className="w-6 h-6 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default SidebarHeader;
