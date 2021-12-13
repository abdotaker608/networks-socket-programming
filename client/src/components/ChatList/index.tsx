import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import UserList, { UserListProps } from "../UserList";

export interface ChatListProps {
  users: UserListProps["users"];
}

const ChatList: React.FC<ChatListProps> = ({ users }) => {
  return (
    <Box overflowY="hidden" d="flex" flexDir="column">
      <Heading
        as="h4"
        fontSize="2xl"
        padding="5px 0"
        borderBottom="1px solid silver"
      >
        In Chat
      </Heading>
      <UserList users={users} />
    </Box>
  );
};

export default ChatList;
