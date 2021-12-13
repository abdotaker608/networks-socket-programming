import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { ChatUser } from "src/types";

export interface UserListItemProps {
  user: ChatUser;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      background={user.self ? "blue.300" : "white"}
      color={user.self ? "white" : "black"}
      borderRadius="md"
      padding={1}
    >
      <Image src={user.avatar} width={8} height={8} />
      <Text marginLeft={2} textTransform="capitalize">
        {user.name}
      </Text>
    </Box>
  );
};

export default UserListItem;
