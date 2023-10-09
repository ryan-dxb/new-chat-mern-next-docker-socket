import AppWrapper from "@/components/common/AppWrapper";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>;
};

export default Layout;
