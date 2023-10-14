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
import { useEffect, useState } from "react";
import InputWithIcon from "../common/InputWithIcon";
import { Card, CardContent, CardFooter } from "../ui/card";
import BorderedAvatar from "../common/BorderedAvatar";
import {
  AtSign,
  Contact2,
  Globe,
  Home,
  Hotel,
  Pencil,
  PhoneCall,
  Pin,
  Quote,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/features/user/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormLayout from "../authForms/common/FormLayout";
import { useUpdateUserMutation } from "@/store/features/user/userApi";
import { setUser } from "@/store/features/user/userSlice";
import { useAppDispatch } from "@/store/hooks";

interface SettingsModalProps {
  children: React.ReactNode;
}

const UpdateProfileFormSchema = z.object({
  firstName: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.length > 2;
      },
      {
        message: "Please enter a valid first name",
      }
    ),
  lastName: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.length > 2;
      },
      {
        message: "Please enter a valid first name",
      }
    ),
  username: z.string().min(2, "Please enter a valid username"),
  status: z.string().min(2, "What's on your mind?"),
  email: z.string().email("Please enter a valid email address"),
});

const SettingsModal: NextPage<SettingsModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatar, setAvatar] = useState<any>(null); // [1]

  const handleAvatarChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatarChanged(true);
    }
  };

  // const handleAvatarRemove = () => {}

  // const handleAvatarSave = () => {};

  // const handleAvatarCancel = () => {};

  const form = useForm<z.infer<typeof UpdateProfileFormSchema>>({
    resolver: zodResolver(UpdateProfileFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || "",
      status: user?.status || "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateProfileFormSchema>) {
    const { firstName, lastName, email, username, status } = values;

    const response = await updateUser({
      firstName,
      lastName,
      email,
      username,
      status,
    }).unwrap();

    if (response) {
      console.log("response", response);
    }

    if (isSuccess) {
    }
    try {
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.setValue("firstName", user?.firstName);
        form.setValue("lastName", user?.lastName);
        form.setValue("email", user?.email);
        form.setValue("username", user?.username);
        form.setValue("status", user?.status);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <Card className="w-full max-w-2xl py-4 mx-auto">
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <BorderedAvatar size="xl" />
                </div>

                <div className="flex flex-col mt-6 space-y-2">
                  <InputWithIcon
                    name="firstName"
                    control={form.control}
                    icon={<Pencil className="w-5 h-5" />}
                    placeholder="First Name"
                  />
                  <InputWithIcon
                    name="lastName"
                    control={form.control}
                    icon={<Pencil className="w-5 h-5" />}
                    placeholder="Last Name"
                  />

                  <InputWithIcon
                    name="email"
                    control={form.control}
                    icon={<AtSign className="w-5 h-5" />}
                    placeholder="Email"
                    disabled
                  />
                  <InputWithIcon
                    name="username"
                    control={form.control}
                    icon={<Contact2 className="w-5 h-5" />}
                    placeholder="Username"
                  />

                  <InputWithIcon
                    name="status"
                    control={form.control}
                    icon={<Quote className="w-5 h-5 rotate-180" />}
                    placeholder="What's on your mind?"
                  />
                </div>
              </CardContent>
            </Card>

            <DialogFooter className="mt-4">
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
