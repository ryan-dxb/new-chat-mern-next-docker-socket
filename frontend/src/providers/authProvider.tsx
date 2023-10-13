import { useAppSelector } from "@/store/hooks";
import { NextPage } from "next";

interface AuthProviderProps {}

const AuthProvider: NextPage<AuthProviderProps> = () => {
  return (
    <>
      <h1>AuthProvider</h1>
    </>
  );
};

export default AuthProvider;
