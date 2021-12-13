import React from "react";
import "./sass/main.scss";
import { Box } from "@chakra-ui/react";
import Router from "./router";
import { ChakraProvider, SocketProvider } from "./providers";

function App() {
  return (
    <SocketProvider>
      <ChakraProvider>
        <Box className="App">
          <Router />
        </Box>
      </ChakraProvider>
    </SocketProvider>
  );
}

export default App;
