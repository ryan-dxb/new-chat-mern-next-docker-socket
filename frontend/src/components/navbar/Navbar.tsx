import { NextPage } from "next";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {}

const Navbar: NextPage<NavbarProps> = () => {
  return (
    <>
      <DesktopNavbar />
      {/* <MobileNavbar /> */}
    </>
  );
};

export default Navbar;
