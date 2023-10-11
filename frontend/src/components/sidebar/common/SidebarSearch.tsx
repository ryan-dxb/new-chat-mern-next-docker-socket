import { Input } from "@/components/ui/input";
import { NextPage } from "next";

interface SidebarSearchProps {}

const SidebarSearch: NextPage<SidebarSearchProps> = () => {
  return (
    <div className="pb-2 min-h-[40px]">
      <Input
        type="text"
        placeholder="Type a message"
        className="w-full h-10 px-4 text-sm bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-blue-500"
      />
    </div>
  );
};

export default SidebarSearch;
