import { Server } from "socket.io";

let io: Server;

// Set & Get the socket.io server
export const setSocketServerInstance = async (ioInstance: Server) => {
  io = await ioInstance;

  return io;
};

export const getSocketServerInstance = () => {
  return io;
};

console.log("GETTING SERVER SOCKET", getSocketServerInstance());
