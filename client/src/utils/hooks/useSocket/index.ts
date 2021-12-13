import { useContext } from "react";
import { SocketContext } from "src/providers/Socket";

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
