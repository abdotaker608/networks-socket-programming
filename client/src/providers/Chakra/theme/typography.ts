import { ChakraTheme } from "@chakra-ui/react";

interface Typography {
  fonts?: ChakraTheme["fonts"];
  fontSizes?: ChakraTheme["fontSizes"];
  fontWeights?: ChakraTheme["fontWeights"];
}

const typography = {
  fonts: {
    heading: "'Baloo 2', cursive",
    body: "'Baloo 2', cursive",
    mono: "'Baloo 2', cursive",
  },
} as Typography;

export default typography;
