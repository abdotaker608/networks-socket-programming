import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import Message, { MessageProps } from "../Message";

export interface MessagesProps {
  messages: MessageProps[];
}

const Messages: React.FC<MessagesProps> = ({ messages = [] }) => {
  //mesages container ref
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  //scroll to the bottom of the container
  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollBy({ top: 999, behavior: "smooth" });
  };

  useEffect(() => {
    //upon receiving new messages we scroll to the
    //very end to show these messages
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      height={300}
      overflowY="auto"
      borderTop="1px solid lightgray"
      borderInline="1px solid lightgray"
      padding={2}
      display="flex"
      flexDir="column"
      flexGrow={{ lg: 1 }}
      gap={3}
      ref={messagesContainerRef}
    >
      {messages.map((message) => (
        <Message key={message.senderId} {...message} />
      ))}
    </Box>
  );
};

export default Messages;
