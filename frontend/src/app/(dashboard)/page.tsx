import ChatLayout from "@/components/chat/ChatLayout";
import SettingsModal from "@/components/modals/SettingsModal";
import { NextPage } from "next";

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  return (
    <>
      <ChatLayout />
    </>
  );
};

export default Dashboard;
