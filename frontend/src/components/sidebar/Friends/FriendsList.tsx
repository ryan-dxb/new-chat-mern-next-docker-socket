"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectUser } from "@/store/features/user/userSlice";
import { useAppSelector } from "@/store/hooks";
import { NextPage } from "next";
import FriendListItem from "./FriendListItem";
import { useGetFriendsQuery } from "@/store/features/user/userApi";
import { selectFriends } from "@/store/features/friend/friendSlice";

interface FriendsListProps {}

const FriendsList: NextPage<FriendsListProps> = () => {
  const { data } = useGetFriendsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const friends = useAppSelector(selectFriends);

  const user = useAppSelector(selectUser);

  return (
    <>
      {friends && friends.length > 0 && (
        <div className="flex-grow-0 h-fit">
          <p>
            <span className="text-xs font-semibold text-muted-foreground">
              Your Friends
            </span>
          </p>
        </div>
      )}

      <ScrollArea className="flex flex-col flex-1  space-y-2 mt-2  h-[90%]">
        <div className="flex flex-col flex-1 space-y-3">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <FriendListItem key={friend.id} friend={friend} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 p-2 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                You have no friends
              </p>
              <p className="text-xs text-muted-foreground">
                You can add new friends using their email. Please use the add
                friend button in the top right corner.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default FriendsList;
