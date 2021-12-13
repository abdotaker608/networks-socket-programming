import React, { useState, useCallback } from "react";
import Avatar, { AvatarProps } from "../Avatar";
import { Box, Icon, CircularProgress } from "@chakra-ui/react";
import { useColors } from "src/utils/hooks";
import { AiOutlineReload as ReloadIcon } from "react-icons/ai";

const RegeneratingAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  //theme colors
  const [lightgrayAlpha] = useColors("gray.300", { alpha: 0.7 });
  const [blue, lightgray] = useColors("blue.600", "gray.100");

  //avatar source, empty source indicates loading
  const [avatar, setAvatar] = useState("");

  //update avatar source
  const updateAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
    props.onAvatarChange?.(newAvatar);
  };

  //key state for the AVATAR component
  const [key, setKey] = useState(Date.now());

  const generateNewRandomAvatar = useCallback(() => {
    //upon clicking the overlay just rerender the AVATAR component
    //to generate a new random avatar
    setAvatar(""); //unset avatar to indicate loading
    setKey(Date.now()); //unique key timestamp
  }, []);

  return (
    <Box position="relative" rounded="full" width={24} height={24}>
      <Avatar
        key={key}
        {...props}
        onAvatarChange={updateAvatar}
        width={24}
        height={24}
      />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        left="0"
        background={avatar ? lightgrayAlpha : lightgray}
        opacity={avatar ? 0 : 1}
        zIndex={20}
        rounded="full"
        transition="250ms ease-out"
        cursor="pointer"
        _hover={{ opacity: 1 }}
        onClick={generateNewRandomAvatar}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {avatar ? (
          <Icon as={ReloadIcon} boxSize={5} color={blue} />
        ) : (
          <CircularProgress size={5} color={blue} isIndeterminate />
        )}
      </Box>
    </Box>
  );
};

export default RegeneratingAvatar;
