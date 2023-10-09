import { NextPage } from "next";
import SidebarWrapper from "./common/SidebarWrapper";
import SidebarHeader from "./common/SidebarHeader";
import SidebarSearch from "./common/SidebarSearch";

interface GroupsProps {}

const Groups: NextPage<GroupsProps> = () => {
  return (
    <SidebarWrapper>
      <SidebarHeader header="Groups" />
      <SidebarSearch />
    </SidebarWrapper>
  );
};

export default Groups;
