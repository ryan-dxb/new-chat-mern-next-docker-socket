"use client";

import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
// import useSession from "@/hooks/useSession";

interface SettingsModalProps {
  children: React.ReactNode;
}

const SettingsModal: NextPage<SettingsModalProps> = ({ children }) => {
  // const { user } = useSession();

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState<any>(null); // [1]

  const handleAvatarChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatarChanged(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Input
              id="name"
              placeholder="First Name"
              className="col-span-4"
              // defaultValue={user?.firstName || undefined}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Input
              id="name"
              placeholder="Last Name"
              className="col-span-4"
              // defaultValue={user?.lastName || undefined}
            />
          </div>

          <div className="flex flex-row items-center space-x-4">
            <Image
              src={
                // user?.avatar
                //   ? user?.avatar
                //   : avatar
                //   ? avatar
                "/avatar_placeholder.png"
              }
              width={50}
              height={50}
              className="object-cover w-16 h-16 col-span-1 rounded-full"
              alt="Avatar"
            />
            <Label htmlFor="picture" className="col-span-1">
              <div className="flex items-center h-10 px-6 py-2 transition-all duration-200 border rounded-md cursor-pointer text-muted-foreground/50 hover:border-primary hover:text-muted-foreground/80">
                Upload
              </div>
            </Label>
            <Input
              id="picture"
              type="file"
              className="hidden col-span-3"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        </div>
        <DialogFooter className="">
          <div className="flex flex-row justify-between w-full">
            <Button type="submit" variant="destructive">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
