import { ChakraTheme, extendTheme } from "@chakra-ui/react";
import typography from "./typography";
import breakpoints from "./breakpoints";

const theme = extendTheme({
  ...typography,
  breakpoints,
}) as ChakraTheme;

export default theme;
