import { Button } from "@/components/ui/button";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRejectFriendRequestMutation,
} from "@/store/features/friend/friendApi";
import { VariantProps } from "class-variance-authority";
import { NextPage } from "next";

interface RequestActionButtonProps {
  request_id: string;
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
  request_id,
}) => {
  const [cancelInvite] = useCancelFriendRequestMutation();
  const [acceptInvite] = useAcceptFriendRequestMutation();
  const [rejectInvite] = useRejectFriendRequestMutation();

  const handleCancelInvite = async (request_id: string) => {
    try {
      const res = await cancelInvite(request_id).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptInvite = async (request_id: string) => {
    try {
      const res = await acceptInvite(request_id).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectInvite = async (request_id: string) => {
    try {
      const res = await rejectInvite(request_id).unwrap();
      console.log(res);
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
      onClick={() => handleAction(action, request_id)}
    >
      <span>{icon}</span>
    </Button>
  );
};

export default RequestActionButton;
