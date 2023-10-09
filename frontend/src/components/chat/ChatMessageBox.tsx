import { NextPage } from "next";

interface ChatMessageBoxProps {}

const ChatMessageBox: NextPage<ChatMessageBoxProps> = () => {
  return (
    <div className="flex flex-col flex-1 p-4">
      {/* Recieved Message */}
      <div className="flex flex-row items-center justify-start mb-4 max-w-[600px] mr-auto ">
        <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-gradient-to-br from-blue-500 to-blue-600">
          <p className="text-2xl font-bold text-white">A</p>
        </div>
        <div className="flex flex-col p-2 ml-2 bg-gray-100 border rounded-md">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">12:00 PM</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, quod voluptates dolorum quos
            </p>
          </div>
        </div>
      </div>

      {/* Sent Message */}
      <div className="flex flex-row items-center justify-end mb-4 max-w-[600px] ml-auto">
        <div className="flex flex-col p-2 mr-2 bg-gray-100 border rounded-md">
          <div className="flex flex-row items-center space-x-2">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">12:00 PM</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, quia, quod voluptates dolorum quos
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shrink-0">
          <p className="text-2xl font-bold text-white">A</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBox;
