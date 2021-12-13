import { Socket, Namespace, Server } from "src/types";
import { CHAT_ROOM_NAME, CHAT_ROUTE } from "src/constants";
import Emitter from "./Emitter";

class Configurator {
  private emitter: Emitter; //Events emitter
  private server: Server; //IO Server

  constructor(server: Server, emitter: Emitter) {
    this.server = server;
    this.emitter = emitter;
  }

  //connection event
  private setupConnectionEvent = (namespace: Namespace) => {
    namespace.on("connection", (socket) => {
      //Successfully connected!!
      console.log(`New socket connected with ID: ${socket.id}`);
      //assign user's data to the socket upon a successfull connection
      socket.data = socket.handshake.query;
      //Join main chat room
      socket.join(CHAT_ROOM_NAME);
      //setup the events for the new connected socket
      this.setupEvents(socket);
      //emit a new join event
      this.emitter.emitJoinedEvent(socket);
      //send the current client data to the new socket
      this.emitter.emitInitialEvent(socket, namespace);
    });
  };

  //message event
  private setupMessageEvent = (socket: Socket) => {
    socket.on("message", (messageText) => this.emitter.emitMessageEvent(socket, messageText));
  };

  //disconnect event
  private setupDisconnectEvent = (socket: Socket) => {
    socket.on("disconnect", () => this.emitter.emitLeftEvent(socket));
  };

  //setup all events
  private setupEvents = (socket: Socket) => {
    //setup events for each newly created socket
    this.setupMessageEvent(socket);
    this.setupDisconnectEvent(socket);
  };

  setupNamespace = () => {
    //Create name space
    const chatNamespace = this.server.of(CHAT_ROUTE) as Namespace;
    //setup connection event
    this.setupConnectionEvent(chatNamespace);
  };
}

export default Configurator;
