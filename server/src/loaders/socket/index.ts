import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { ServerToClientEvents, ClientToServerEvents, User, InterserverEvents } from "src/types";
import { ChatService } from "src/services";

const setupNamespaces = (io: Server) => {
  //chat namespace
  const chatService = new ChatService(io);
  chatService.configurator.setupNamespace();
};

export const loadSocketIO = (httpServer: HTTPServer) => {
  //IO Socket
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterserverEvents, User>(httpServer, {
    transports: ["websocket"],
  });
  //Configure namespaces
  setupNamespaces(io);
};
