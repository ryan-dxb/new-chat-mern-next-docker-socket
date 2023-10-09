import { NextPage } from "next";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: NextPage<AppWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-[100vh]">
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default AppWrapper;
