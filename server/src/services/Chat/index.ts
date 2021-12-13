import Emitter from "./Emitter";
import Configurator from "./Configurators";
import { Server } from "src/types";

class ChatService {
  server: Server; //IO Server
  emitter: Emitter; //Events emitter
  configurator: Configurator; //Configurator

  constructor(server: Server) {
    this.server = server;
    this.emitter = new Emitter();
    this.configurator = new Configurator(this.server, this.emitter);
  }
}

export default ChatService;
