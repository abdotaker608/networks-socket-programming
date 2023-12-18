import React, { useState, useEffect, useCallback } from "react";
import { Image } from "@chakra-ui/react";
import {
  adjectives,
  names,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { useColors } from "src/utils/hooks";
import { useToast } from "@chakra-ui/react";
import { useEmojify } from "src/utils/hooks";

export interface AvatarProps {
  onAvatarChange?: (avatar: string) => void;
  width?: number | string;
  height?: number | string;
}

const Avatar: React.FC<AvatarProps> = ({
  onAvatarChange,
  width = 24,
  height = 24,
}) => {
  //theme colors
  const [lightgray] = useColors("gray.100");

  //stores the generated random avatar source
  const [avatar, setAvatar] = useState("");

  //toast notifications
  const toast = useToast();

  //emojifying
  const emojify = useEmojify();

  //generate unique name for generating a random avatar
  const generateUniqueName = useCallback(() => {
    const uniqueName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, names],
    });
    return uniqueName;
  }, []);

  //generates a random avatar
  const generateRandomAvatar = useCallback(async () => {
    const uniqueName = generateUniqueName(); //random name
    const background = encodeURIComponent(lightgray); //encoding for URL
    const styles = "micah"; //dicebear styles
    const radius = "50"; //image border radius
    const uniqueAvatar = `https://api.dicebear.com/7.x/${styles}/svg?seed=${uniqueName}&background=${background}&radius=${radius}`;
    //internet/network validation before upadting the state
    try {
      const response = await fetch(uniqueAvatar);
      if (response.status === 200) {
        setAvatar(uniqueAvatar);
        onAvatarChange?.(uniqueAvatar);
      }
    } catch (err) {
      toast({
        title: emojify("Couldn't load your avatar :("),
        variant: "subtle",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    return uniqueAvatar;
  }, []);

  useEffect(() => {
    //generate a random avatar upon mounting
    generateRandomAvatar();
  }, []);

  return avatar ? (
    <Image rounded="full" src={avatar} width={width} height={height} alt="" />
  ) : (
    <></>
  );
};

export default Avatar;
