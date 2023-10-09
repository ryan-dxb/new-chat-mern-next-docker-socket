import io, { Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  socket = io("/", {
    transports: ["websocket"],
    autoConnect: true,
  });

  console.log(socket.emit("test", "test"));

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  console.log(socket);
};
