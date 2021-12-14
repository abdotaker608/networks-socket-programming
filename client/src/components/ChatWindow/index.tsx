import React, { useState, useEffect, useCallback} from "react";
import { Box } from "@chakra-ui/react";
import ChatInput from "../ChatInput";
import Messages from "../Messages";
import { MessageProps } from "../Message";
import {
  ChatUser,
  ClientToServerMessagePayload,
  ServerToClientMessagePayload,
} from "src/types";
import { useSocket } from "src/utils/hooks";
import { MESSAGE_EVENT } from "src/api/constants";

export interface ChatWindowProps {
  users: ChatUser[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ users }) => {
  //self user
  const self = users.find((user) => user.self);

  //chat messages
  const [messages, setMessages] = useState<MessageProps[]>([]);

  //chat socket
  const { mainChat } = useSocket();

  //construct new message for the messages state
  const constructMessage = useCallback(
    (message: ServerToClientMessagePayload | ClientToServerMessagePayload) => {
      //the user who sent the message
      const sender = users.find((user) => user.id === message.senderId);
      if (!sender) return; //anonymus sender.. Ignore
      //construct new message
      const newMessage = {
        ...message,
        sender,
      } as MessageProps;
      return newMessage;
    },
    [users]
  );

  //setting up message event
  const setupMessageEvent = useCallback(() => {
    if (!mainChat?.socket?.connected) return; //no socket connected
    mainChat.socket.off(MESSAGE_EVENT); //remove old listener
    mainChat.socket.on(MESSAGE_EVENT, (message) => {
      const newMessage = constructMessage(message);
      if (!newMessage) return; //anonymus construction
      //update messages state
      setMessages((messages) => [...messages, newMessage]);
    });
  }, [mainChat?.socket, constructMessage]);

  //setup all listeners
  const setupListeners = useCallback(() => {
    setupMessageEvent();
  }, [setupMessageEvent]);

  useEffect(() => {
    //setup listeners upon mounting
    setupListeners();
  }, [setupListeners]);

  //send message to chat
  const sendMessage = useCallback(
    (content: string) => {
      //anonymus user or no socket connected.. Ignore
      if (!(self && mainChat?.socket?.connected)) return;
      //construct message
      const message = {
        senderId: self.id,
        message: content,
      } as ClientToServerMessagePayload;
      //update messages state
      const newMessage = constructMessage(message);
      if (!newMessage) return; //anonymus construction
      setMessages((messages) => [...messages, newMessage]);
      //send to others
      mainChat.socket.emit(MESSAGE_EVENT, message);
    },
    [mainChat?.socket, self]
  );

  return (
    <Box d="flex" flexDir="column">
      <Messages messages={messages} />
      <ChatInput onSubmit={sendMessage} />
    </Box>
  );
};

export default ChatWindow;
