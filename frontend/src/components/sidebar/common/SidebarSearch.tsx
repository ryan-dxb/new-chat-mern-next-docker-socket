import { Input } from "@/components/ui/input";
import { NextPage } from "next";

interface SidebarSearchProps {}

const SidebarSearch: NextPage<SidebarSearchProps> = () => {
  return (
    <div className="py-2 min-h-[40px]">
      <Input
        type="text"
        placeholder="Type a message"
        className="w-full h-[40px] px-4 py-2 text-sm bg-transparent 
          focus-visible:outline-blue-500 focus-visible:ring-0  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 "
      />
    </div>
  );
};

export default SidebarSearch;
