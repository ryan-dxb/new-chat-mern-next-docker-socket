"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectUser } from "@/store/features/user/userSlice";
import { useAppSelector } from "@/store/hooks";
import { NextPage } from "next";
import { useGetFriendsQuery } from "@/store/features/user/userApi";
import { selectFriends } from "@/store/features/friend/friendSlice";
import ChatListItem from "./ChatListItem";
import { useGetAllConversationsQuery } from "@/store/features/conversation/conversationApi";
import { selectConversations } from "@/store/features/conversation/conversationSlice";

interface ChatListProps {}

const ChatList: NextPage<ChatListProps> = () => {
  const { data } = useGetAllConversationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // const conversatons = useAppSelector(selectConversations);
  const conversations = data?.conversations;

  return (
    <>
      {conversations && conversations.length > 0 && (
        <div className="flex-grow-0 h-fit">
          <p>
            <span className="text-xs font-semibold text-muted-foreground">
              Your conversations
            </span>
          </p>
        </div>
      )}

      <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
        <div className="flex flex-col flex-1 space-y-3">
          {conversations && conversations.length > 0 ? (
            conversations.map((conversation: any) => (
              <ChatListItem key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 p-2 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                You have no active chats
              </p>
              <p className="text-xs text-muted-foreground">
                You can start a chat with your friends by clicking on their
                names in the sidebar
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default ChatList;
