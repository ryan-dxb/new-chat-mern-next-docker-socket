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
import InputWithIcon from "../common/InputWithIcon";
import { Card, CardContent, CardFooter } from "../ui/card";
import BorderedAvatar from "../common/BorderedAvatar";
import {
  AtSign,
  Contact2,
  FileEdit,
  Globe,
  Home,
  Hotel,
  Pencil,
  PhoneCall,
  Pin,
  Trash2,
} from "lucide-react";

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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Card className="w-full max-w-2xl py-4 mx-auto">
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <BorderedAvatar size="xl" />
            </div>

            <div className="w-full px-4 mt-6">
              <div className="flex flex-row space-x-4">
                <InputWithIcon
                  icon={<Pencil className="w-5 h-5" />}
                  placeholder="First Name"
                />
                <InputWithIcon
                  icon={<Pencil className="w-5 h-5" />}
                  placeholder="Last Name"
                />
              </div>

              <div className="flex flex-row mt-4 space-x-4">
                <InputWithIcon
                  icon={<AtSign className="w-5 h-5" />}
                  placeholder="Email"
                />
                <InputWithIcon
                  icon={<Contact2 className="w-5 h-5" />}
                  placeholder="Username"
                />
              </div>

              <div className="mt-4">
                <InputWithIcon
                  icon={<Home className="w-5 h-5" />}
                  placeholder="Address"
                />
              </div>

              <div className="flex flex-row mt-4 space-x-4">
                <InputWithIcon
                  icon={<Pin className="w-5 h-5" />}
                  placeholder="City"
                />
                <InputWithIcon
                  icon={<Globe className="w-5 h-5" />}
                  placeholder="Country"
                />
              </div>

              <div className="flex flex-row mt-4 space-x-4">
                <InputWithIcon
                  icon={<Hotel className="w-5 h-5" />}
                  placeholder="Business Name"
                />
                <InputWithIcon
                  icon={<PhoneCall className="w-5 h-5" />}
                  placeholder="Contact"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="">
          <div className="flex flex-row justify-between w-full space-x-4">
            <Button type="submit" variant="outline" className="w-full">
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
