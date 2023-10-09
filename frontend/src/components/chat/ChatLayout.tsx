import { NextPage } from "next";
import ChatHeader from "./ChatHeader";
import ChatMessageBox from "./ChatMessageBox";
import ChatInput from "./ChatInput";

interface ChatLayoutProps {}

const ChatLayout: NextPage<ChatLayoutProps> = () => {
  return (
    <div className="flex flex-col w-full">
      <ChatHeader />

      <ChatMessageBox />

      <ChatInput />
    </div>
  );
};

export default ChatLayout;
