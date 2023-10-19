"use client";
import { NextPage } from "next";
import { Smile, Paperclip, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface ChatInputProps {}

const ChatInput: NextPage<ChatInputProps> = () => {
  return (
    <div className="flex flex-row items-center h-24 px-4 space-x-2">
      <Button className="w-12 h-12 p-2 rounded-full " variant="outline">
        <Smile className="w-6 h-6 text-muted-foreground" />
      </Button>
      <Button className="w-12 h-12 p-2 rounded-full " variant="outline">
        <Paperclip className="w-6 h-6 text-muted-foreground" />
      </Button>
      <div className="flex flex-1 h-12 ">
        <Input
          type="text"
          placeholder="Type a message"
          className="w-full h-full px-4 py-2 text-sm bg-transparent focus-visible:outline-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 "
        />
      </div>
      <Button
        className="w-12 h-12 p-2 bg-blue-500 rounded-full hover:bg-blue-600"
        variant="default"
      >
        <SendHorizonal className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
};

export default ChatInput;
