import { Server } from "socket.io";
import {
  getSocketServerInstance,
  setSocketServerInstance,
} from "./socketServerStore";

const registerSocketServer = async (server: any) => {
  const io = await new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const serverIO = await setSocketServerInstance(io);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("test", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default registerSocketServer;
