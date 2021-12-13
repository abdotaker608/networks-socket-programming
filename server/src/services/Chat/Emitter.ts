import { Namespace, ServerToClientMessagePayload, ServerToClientStatePayload, Socket, User } from "src/types";
import { CHAT_ROOM_NAME, INITIAL_EVENT, JOINED_EVENT, LEFT_EVENT, MESSAGE_EVENT } from "src/constants";

class Emitter {
  //emitting a socket joined/left event
  private emitStateEvent = (socket: Socket, state: typeof JOINED_EVENT | typeof LEFT_EVENT) => {
    if (!socket.data.id) return; //anonymus sender.. Ignore
    //notify state joined/left
    const payload = { senderId: socket.data.id, user: socket.data } as ServerToClientStatePayload;
    socket.in(CHAT_ROOM_NAME).emit(state, payload);
  };

  //joined event shortcut
  emitJoinedEvent = (socket: Socket) => this.emitStateEvent(socket, JOINED_EVENT);

  //left event shortcut
  emitLeftEvent = (socket: Socket) => this.emitStateEvent(socket, LEFT_EVENT);

  //generating a message
  private generateMessage = (socket: Socket, payload?: unknown): ServerToClientMessagePayload => {
    if (!payload) return { senderId: socket.data.id as string }; //no payload
    return { senderId: socket.data.id as string, message: payload };
  };

  //emitting a message event
  emitMessageEvent = (socket: Socket, message: ServerToClientMessagePayload) => {
    if (!socket.data.id) return; //anonymus sender.. Ignore
    //Just forward the message to all other room clients
    //adding additional information about the sender
    socket.in(CHAT_ROOM_NAME).emit(MESSAGE_EVENT, message);
  };

  //emitting an even for new clients
  emitInitialEvent = async (socket: Socket, namespace: Namespace) => {
    //all users excluding self
    const users = (await namespace.fetchSockets()).filter((s) => s.id !== socket.id).map((s) => s.data) as User[];
    const payload = { users };
    //send for the user
    socket.emit(INITIAL_EVENT, payload);
  };
}

export default Emitter;
