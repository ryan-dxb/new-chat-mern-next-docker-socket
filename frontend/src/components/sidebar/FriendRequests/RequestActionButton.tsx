import { Button } from "@/components/ui/button";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRejectFriendRequestMutation,
} from "@/store/features/friend/friendApi";
import { VariantProps } from "class-variance-authority";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFriendRequestReceived,
  removeFriendRequestSent,
  setFriend,
} from "@/store/features/friend/friendSlice";
import { FriendRequestType } from "@/store/types/friend";

interface RequestActionButtonProps {
  request: FriendRequestType;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  icon: React.ReactNode;
  action: "accept" | "cancel" | "reject";
}

const RequestActionButton: NextPage<RequestActionButtonProps> = ({
  variant,
  icon,
  action,
  request,
}) => {
  const dispatch = useAppDispatch();

  const [cancelInvite] = useCancelFriendRequestMutation();
  const [acceptInvite] = useAcceptFriendRequestMutation();
  const [rejectInvite] = useRejectFriendRequestMutation();

  const handleCancelInvite = async (request_id: string) => {
    try {
      const res = await cancelInvite(request_id).unwrap();

      if (res) {
        dispatch(removeFriendRequestSent(request_id));
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptInvite = async (request_id: string) => {
    try {
      const res = await acceptInvite(request_id).unwrap();

      if (res) {
        dispatch(
          setFriend({
            friend_id: request.userDetails.id,
            firstName: request.userDetails.firstName,
            lastName: request.userDetails.lastName,
            avatar: request.userDetails.avatar,
            username: request.userDetails.username,
            email: request.userDetails.email,
            status: request.userDetails.status,
          })
        );
        dispatch(removeFriendRequestReceived(request_id));
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectInvite = async (request_id: string) => {
    try {
      const res = await rejectInvite(request_id).unwrap();

      if (res) {
        dispatch(removeFriendRequestReceived(request_id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAction = (action: string, request_id: string) => {
    switch (action) {
      case "accept":
        handleAcceptInvite(request_id);
        break;
      case "cancel":
        handleCancelInvite(request_id);
        break;
      case "reject":
        handleRejectInvite(request_id);
        break;
      default:
        break;
    }
  };

  return (
    <Button
      variant={variant}
      className="w-8 h-8 rounded-full"
      onClick={() => handleAction(action, request.request_id)}
    >
      <span>{icon}</span>
    </Button>
  );
};

export default RequestActionButton;
