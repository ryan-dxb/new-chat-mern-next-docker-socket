import { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface BorderedAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const BorderedAvatar: NextPage<BorderedAvatarProps> = ({ size = "sm" }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-500 rounded-full w-11 h-11",
        size === "sm" && "w-11 h-11",
        size === "md" && "w-14 h-14",
        size === "lg" && "w-16 h-16",
        size === "xl" && "w-24 h-24"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 bg-white rounded-full",
          size === "sm" && "w-10 h-10",
          size === "md" && "w-[52px] h-[52px]",
          size === "lg" && "w-[60px] h-[60px]",
          size === "xl" && "w-[92px] h-[92px]"
        )}
      >
        <Avatar
          className={cn(
            "flex items-center justify-center bg-white rounded-full",
            size === "sm" && "w-9 h-9",
            size === "md" && "w-[48px] h-[48px]",
            size === "lg" && "w-[56px] h-[56px]",
            size === "xl" && "w-[88px] h-[88px]"
          )}
        >
          <AvatarFallback className="bg-gray-300">
            <h1>JD</h1>
          </AvatarFallback>
          <AvatarImage src="https://avatars.githubusercontent.com/u/25186847?v=4" />
        </Avatar>
      </div>
    </div>
  );
};

export default BorderedAvatar;
