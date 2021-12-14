import express from "express";
import { createServer } from "http";
import { PORT as DEFAULT_PORT } from "./constants";
import { loadApp, loadSocketIO } from "./loaders";

//Express app
const app = express();

//HTTP server
const httpServer = createServer(app);

//Setup socket server
loadSocketIO(httpServer);

//Setup express app
loadApp(app);

//App port
const PORT = process.env.PORT ?? DEFAULT_PORT;

//Run server
httpServer.listen(PORT, () => {
  console.log(`Server successfully started and listening on port ${PORT}`);
});
