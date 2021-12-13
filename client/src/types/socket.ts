import { Socket as SocketIO } from "socket.io-client";
import { User } from ".";

/* payloads */
export interface ServerToClientMessagePayload {
  senderId: string;
  message?: unknown;
}

export interface ClientToServerMessagePayload {
  senderId: string;
  message?: unknown;
}

export interface ServerToClientStatePayload {
  senderId: string;
  user: User;
}

export interface ServerToClientInitialPayload {
  users: User[];
}

/* generics */

export interface ServerToClientEvents {
  message: (payload: ServerToClientMessagePayload) => void;
  left: (payload: ServerToClientStatePayload) => void;
  joined: (payload: ServerToClientStatePayload) => void;
  initial: (payload: ServerToClientInitialPayload) => void;
}

export interface ClientToServerEvents {
  message: (messageText: ClientToServerMessagePayload) => void;
}

export type Socket = SocketIO<ServerToClientEvents, ClientToServerEvents>;
