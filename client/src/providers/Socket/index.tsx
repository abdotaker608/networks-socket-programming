import React, { createContext, useState, useCallback } from "react";
import { sockets } from "src/api";
import { User, Socket } from "src/types";

//main chat types
interface MainChatConnect {
  (user: User, successCb?: (socket: Socket) => void): Socket;
}

//context value type
export interface SocketContextShape {
  mainChat?: {
    socket?: Socket;
    connect: MainChatConnect;
  };
}

//main context
export const SocketContext = createContext<SocketContextShape>({});

const SocketProvider: React.FC = ({ children }) => {
  //API Sockets
  const { instantiateMainChatSocket } = sockets;

  //main chat room
  const [mainChatSocket, setMainChatSocket] = useState<Socket>();

  const connectToMainChat: MainChatConnect = useCallback(
    (user, successCb) => {
      if (mainChatSocket?.connected) return mainChatSocket; //socket already connected
      //connect and send given user data
      const socket = instantiateMainChatSocket(user);
      //update state
      setMainChatSocket(socket);
      //connection listener
      socket.on("connect", () => {
        //execute success callback if given upon a successfull connection
        successCb?.(socket);
      });
      //return socket instance
      return socket;
    },
    [mainChatSocket]
  );

  //context provider value
  const value = {
    mainChat: {
      socket: mainChatSocket,
      connect: connectToMainChat,
    },
  } as SocketContextShape;

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
