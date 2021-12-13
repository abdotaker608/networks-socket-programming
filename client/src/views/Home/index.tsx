import React, { useState, useCallback } from "react";
import { Box, Button, CircularProgress, useToast } from "@chakra-ui/react";
import { RegeneratingAvatar as Avatar, Input } from "src/components";
import { User } from "src/types";
import { v4 as uuid } from "uuid";
import { useEmojify, useSocket } from "src/utils/hooks";
import * as routes from "src/router/routes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //socket context
  const { mainChat } = useSocket();

  //user data to use when joining chat room
  const [data, setData] = useState<User>({ name: "", avatar: "", id: uuid() });

  //update user's avatar
  const updateAvatar = (avatar: string) => setData({ ...data, avatar });

  //update user's name
  const updateName = (name: string) => setData({ ...data, name });

  //loading state for joining room
  const [loading, setLoading] = useState(false);

  //toast notifications
  const toast = useToast();

  //emojifying
  const emojify = useEmojify();

  //router navigation
  const navigate = useNavigate();

  //validate data before joining chat
  const validateData = useCallback(() => {
    let isValid = true;

    if (!data.name) {
      toast({
        title: emojify(
          "Please enter a name, People need to know who you are :)"
        ),
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      isValid = false;
    }

    return isValid;
  }, [data]);

  //submit data and join room
  const joinChatRoom = useCallback(() => {
    if (loading) return; //still loading
    setLoading(true); //loading starts
    //validate the data
    const isValid = validateData();
    if (isValid) {
      //valid data, connect to main chat socket
      if (!mainChat) return; //is context instantiated?
      mainChat.connect(data, () => {
        setLoading(false); //loading ends
        navigate(routes.CHAT, { state: data }); //to chat room while preserving user's data
      });
    } else setLoading(false); //loading ends
  }, [data, loading, mainChat]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        width="fit-content"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Avatar onAvatarChange={updateAvatar} />
        <Input
          placeholder="Your name..."
          onChange={(e) => updateName(e.target.value)}
          mt={5}
          onPressEnter={joinChatRoom}
        />
        <Button
          colorScheme="messenger"
          mt={5}
          isLoading={loading}
          spinner={<CircularProgress size={5} isIndeterminate />}
          onClick={joinChatRoom}
        >
          Join Chat
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
