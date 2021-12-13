import { io } from "socket.io-client";
import { User } from "src/types";
import { SOCKET_BASE_URL, CHAT_ROUTE } from "../constants";

export const instantiateMainChatSocket = (user: User) => {
  const socket = io(SOCKET_BASE_URL + CHAT_ROUTE, {
    transports: ["websocket"],
    query: user,
  });
  return socket;
};
