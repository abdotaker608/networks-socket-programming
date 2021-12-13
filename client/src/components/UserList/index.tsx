import { Box } from "@chakra-ui/react";
import React from "react";
import UserListItem, { UserListItemProps } from "../UserListItem";

export interface UserListProps {
  users: UserListItemProps["user"][];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="stretch"
      gap={3}
      paddingBlock={5}
      height={{ base: 200 }}
      flexGrow={1}
      overflowY="auto"
    >
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default UserList;
