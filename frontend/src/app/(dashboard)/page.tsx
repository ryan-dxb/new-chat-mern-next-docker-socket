"use client";
import ChatLayout from "@/components/chat/ChatLayout";
import { selectSelectedConversation } from "@/store/features/conversation/conversationSlice";
import { useAppSelector } from "@/store/hooks";
import { NextPage } from "next";

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  const selectedConversation = useAppSelector(selectSelectedConversation);

  if (selectedConversation.conversation_id !== "") {
    return (
      <>
        <ChatLayout selectedConversation={selectedConversation} />
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-center mx-auto">
        <h1>
          Please select a conversation to start chatting with your friends!
        </h1>
      </div>
    );
  }
};

export default Dashboard;
