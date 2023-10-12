import { IUser } from "@/store/types/user";
import { NextPage } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface FriendListItemProps {
  friend: IUser;
}

const FriendListItem: NextPage<FriendListItemProps> = ({ friend }) => {
  return (
    <div key={friend.id} className="flex items-center justify-between mr-4">
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="w-10 h-10 ">
          <AvatarFallback className="text-xs bg-primary/5">
            {friend && friend.firstName && friend.lastName ? (
              <>{friend.firstName[0] + friend.lastName[0]}</>
            ) : (
              <>
                <User className="w-4 h-4" />
              </>
            )}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">
            {friend && friend.firstName && friend.lastName
              ? friend.firstName + " " + friend.lastName
              : "Unknown"}
          </p>
          <p className="text-xs font-semibold text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Online Indicator */}
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    </div>
  );
};

export default FriendListItem;
