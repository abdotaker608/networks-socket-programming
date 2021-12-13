import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { ChatUser, ServerToClientMessagePayload } from "src/types";
import { emojify } from "react-emojione";

export interface MessageProps extends ServerToClientMessagePayload {
  sender: ChatUser;
}

const Message: React.FC<MessageProps> = ({ message, sender }) => {
  //self user sent this
  const isSelf = sender.self;

  return (
    <Box
      alignSelf={isSelf ? "flex-start" : "flex-end"}
      background={isSelf ? "blue.300" : "gray.100"}
      color={isSelf ? "white" : "black"}
      padding={3}
      borderRadius="3xl"
      display="flex"
      alignItems="flex-start"
      gap={2}
      maxW="80%"
    >
      <Text lineHeight="2">
        {emojify(message as string, {
          style: {
            width: 20,
            height: 20,
            marginTop: 4,
            display: "inline-block",
          },
        })}
      </Text>
      {!isSelf && <Image src={sender.avatar} width={8} height={8} />}
    </Box>
  );
};

export default Message;
