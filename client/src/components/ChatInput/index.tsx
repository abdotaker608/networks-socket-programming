import React, { useState, useCallback } from "react";
import { Textarea, IconButton, Box } from "@chakra-ui/react";
import { IoSend as SendIcon } from "react-icons/io5";

export interface ChatInputProps {
  onSubmit?: (val: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  //input value
  const [value, setValue] = useState("");

  //change value handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value); //update value
    },
    []
  );

  //submit handler
  const handleSubmit = useCallback(() => {
    if (!value) return; //do not send empty messages
    onSubmit?.(value); //send message
    setValue(""); //reset input value
  }, [value, onSubmit]);

  //key down handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      //enter key handler
      if (e.key === "Enter") {
        e.preventDefault(); //do not insert a new line
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <Box pos="relative" height={150}>
      <Textarea
        placeholder="Write a message..."
        height="100%"
        resize="none"
        paddingRight={50}
        borderRadius={0}
        overflowY="scroll"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <IconButton
        pos="absolute"
        bottom={2}
        right={{ base: 2, lg: 6 }}
        aria-label="send message"
        size="sm"
        icon={<SendIcon />}
        colorScheme="messenger"
        zIndex="sticky"
        onClick={handleSubmit}
      />
    </Box>
  );
};

export default ChatInput;
