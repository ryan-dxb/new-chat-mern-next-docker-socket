import { NextPage } from "next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendFriendRequestMutation } from "@/store/features/friend/friendApi";
import FormInputField from "../authForms/common/FormInputField";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

interface AddFriendModalProps {
  children: React.ReactNode;
}

const AddFriendSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const AddFriendModal: NextPage<AddFriendModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("isOpen", isOpen);

  const [sendFriendRequest, { isSuccess, isError, isLoading }] =
    useSendFriendRequestMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddFriendSchema>>({
    resolver: zodResolver(AddFriendSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddFriendSchema>) {
    const { email } = values;

    try {
      const response = await sendFriendRequest(email).unwrap();

      if (response) {
        setIsOpen(false);

        toast({
          title: "Friend request sent",
          description: `Friend request sent to ${email}`,
          className: "bg-green-500 text-white",
        });
      }
    } catch (error: any) {
      console.log("error", error.data.error.message);

      form.setError("email", {
        type: "manual",
        message: error.data.error.message,
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Friend</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to add as a friend.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormInputField
              name="email"
              placeholder="Enter email"
              control={form.control}
              className="w-full h-10 min-w-full focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-blue-500"
            />
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                className="w-full duration-200 bg-blue-500 hover:bg-blue-600"
              >
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
