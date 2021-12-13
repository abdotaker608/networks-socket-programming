import { Socket as SocketIO, Namespace as NamespaceIO, Server as ServerIO } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
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

export type InterserverEvents = DefaultEventsMap;

export type Socket = SocketIO<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, User>;
export type Namespace = NamespaceIO<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, User>;
export type Server = ServerIO<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, User>;
