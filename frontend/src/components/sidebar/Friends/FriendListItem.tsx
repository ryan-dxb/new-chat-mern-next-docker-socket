import { IUser } from "@/store/types/user";
import { NextPage } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, User } from "lucide-react";
import { FriendModel } from "@/store/types/friend";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedConversation } from "@/store/features/conversation/conversationSlice";
import { useGetOrCreateConversationMutation } from "@/store/features/conversation/conversationApi";
import { selectUser } from "@/store/features/user/userSlice";

interface FriendListItemProps {
  friend: FriendModel;
}

const FriendListItem: NextPage<FriendListItemProps> = ({ friend }) => {
  const user = useAppSelector(selectUser);

  const [getOrCreateConversation, { isLoading, isError }] =
    useGetOrCreateConversationMutation();

  const getOrCreateConversationHandler = async (friend_id: string) => {
    await getOrCreateConversation(friend_id);
  };

  return (
    <div
      key={friend.friend_id}
      className="flex cursor-pointer group"
      onClick={() => getOrCreateConversationHandler(friend.friend_id!)}
    >
      <div className="flex items-center justify-between flex-1 p-2 rounded-md group-hover:bg-primary/5">
        <div className="flex flex-row items-center flex-1 space-x-2 ">
          <Avatar className="w-10 h-10 ">
            <AvatarFallback className="text-xs bg-primary/5">
              {friend &&
              friend.userDetails.firstName &&
              friend.userDetails.lastName ? (
                <>
                  {friend.userDetails.firstName[0] +
                    friend.userDetails.lastName[0]}
                </>
              ) : (
                (
                  <>
                    {friend &&
                      friend.userDetails?.username[0] +
                        friend.userDetails?.username[1]}
                  </>
                ) ?? <User className="w-4 h-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">
              {friend &&
              friend.userDetails.firstName &&
              friend.userDetails.lastName
                ? friend.userDetails.firstName +
                  " " +
                  friend.userDetails.lastName
                : friend?.userDetails.username ?? "Unknown"}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              {friend?.userDetails.status ?? "Hey there! I'm using Messenger."}
            </p>
          </div>
        </div>

        {/* Delete Friend Button*/}
        <Button
          variant="outline"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary/10"
        >
          <span>
            <Trash2 className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default FriendListItem;
