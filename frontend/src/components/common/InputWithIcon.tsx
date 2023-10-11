import { NextPage } from "next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pencil } from "lucide-react";

interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
}

const InputWithIcon: NextPage<InputWithIconProps> = ({ icon, placeholder }) => {
  return (
    <div className="flex items-center justify-center flex-1 h-10 rounded-md ">
      <Button
        className="flex px-3 rounded-r-none disabled:opacity-70 disabled:bg-blue-500 "
        disabled
      >
        {icon}
      </Button>
      <div className="relative flex flex-1">
        <Input
          placeholder={placeholder}
          className="relative w-full h-10 px-4 py-2 border-2 border-l-0 rounded-l-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 "
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
