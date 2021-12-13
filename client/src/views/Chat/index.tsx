import { Box } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { INITIAL_EVENT, JOINED_EVENT, LEFT_EVENT } from "src/api/constants";
import { ChatUser } from "src/types";
import { useSocket } from "src/utils/hooks";
import { ChatList, ChatWindow } from "src/components";

const Chat = () => {
  //router location
  const location = useLocation();

  //self user
  const self = { ...location.state, self: true } as ChatUser;

  //current users on chat including self user
  const [users, setUsers] = useState<Array<ChatUser>>([self]);

  //main chat socket
  const { mainChat } = useSocket();

  //on new client joined listener
  const setupJoinedListener = useCallback(() => {
    if (!mainChat?.socket?.connected) return; //still no socket connected
    //setup listener
    mainChat.socket.on(JOINED_EVENT, (payload) => {
      setUsers((users) => [...users, payload.user]); //add the new user
    });
  }, [mainChat?.socket]);

  //on new client leave listener
  const setupLeftListener = useCallback(() => {
    if (!mainChat?.socket?.connected) return; //still no socket connected
    //setup listener
    mainChat.socket.on(LEFT_EVENT, (payload) => {
      setUsers((users) => users.filter((user) => user.id !== payload.senderId)); //remove left user
    });
  }, [mainChat?.socket]);

  //initial load event to fetch connected clients
  const setupInitialListener = useCallback(() => {
    if (!mainChat?.socket?.connected) return; //still no socket connected
    //setup listener
    mainChat.socket.on(INITIAL_EVENT, (payload) => {
      setUsers([self, ...payload.users]); //self user + other exclusive users
    });
  }, [mainChat?.socket]);

  //setup event listeners for the socket
  const setupListeners = useCallback(() => {
    setupJoinedListener();
    setupLeftListener();
    setupInitialListener();
  }, [setupJoinedListener, setupLeftListener, setupInitialListener]);

  useEffect(() => {
    //setup all listeners
    setupListeners();
    //unlisten upon unmounting from the tree
    return () => {
      mainChat?.socket?.offAny();
    };
  }, [setupListeners]);

  return (
    <Box>
      <Box
        display={{ base: "flex", lg: "grid" }}
        flexDir="column-reverse"
        gridTemplateColumns="2fr 1fr"
        gap={3}
        padding={5}
        height={{ lg: "100vh" }}
      >
        <ChatWindow users={users} />
        <ChatList users={users} />
      </Box>
    </Box>
  );
};

export default Chat;
