import { IUser } from "@/store/types/user";
import { NextPage } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, User } from "lucide-react";
import { FriendModel } from "@/store/types/friend";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedConversation } from "@/store/features/conversation/conversationSlice";
import { useGetOrCreateConversationMutation } from "@/store/features/conversation/conversationApi";

interface ChatListItemProps {
  conversation: any;
}

const ChatListItem: NextPage<ChatListItemProps> = ({ conversation }) => {
  console.log(conversation);

  const dispatch = useAppDispatch();

  const [getOrCreateConversation, { isLoading, isError }] =
    useGetOrCreateConversationMutation();

  const getOrCreateConversationHandler = async (friend_id: string) => {
    console.log(friend_id);

    const res = await getOrCreateConversation(friend_id);
    if (res.data) {
      // dispatch(setSelectedConversation(res.data.id));
      console.log(res.data);
    }
  };
  return (
    <div
      key={conversation._id}
      className="flex cursor-pointer group"
      // onClick={() => getOrCreateConversationHandler(friend.friend_id!)}
    >
      <div className="flex items-center justify-between flex-1 p-2 rounded-md group-hover:bg-primary/5">
        <div className="flex flex-row items-center flex-1 space-x-2 ">
          <Avatar className="w-10 h-10 ">
            <AvatarFallback className="text-xs bg-primary/5">
              {/* {friend && friend.firstName && friend.lastName ? (
                <>{friend.firstName[0] + friend.lastName[0]}</>
              ) : (
                <> */}
              <User className="w-4 h-4" />
              {/* </> */}
              {/* )} */}
            </AvatarFallback>
          </Avatar>
          <div>
            {/* <p className="text-sm font-semibold">
              {friend && friend.firstName && friend.lastName
                ? friend.firstName + " " + friend.lastName
                : "Unknown"}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              {friend.status ?? "Hey there! I'm using Messenger."}
            </p> */}
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

export default ChatListItem;
