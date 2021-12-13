import React, { useCallback } from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

export interface InputProps extends ChakraInputProps {
  onPressEnter?: () => void;
}

const Input: React.FC<InputProps> = ({ onPressEnter, onKeyDown, ...props }) => {
  //keydown event handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onPressEnter?.(); //handle for enter exclusively
      onKeyDown?.(e); //normally the keydown handler if given
    },
    [onPressEnter]
  );

  return <ChakraInput onKeyDown={handleKeyDown} {...props} />;
};

export default Input;
