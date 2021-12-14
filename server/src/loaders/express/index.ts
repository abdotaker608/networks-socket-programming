import { Express } from "express";
import cors from 'cors';
import { CORS } from "src/constants";

export const loadApp = (app: Express) => {
  //middlewares
  app.use(cors(CORS));

  //routes
  app.get("/", (req, res) => {
    res.write("Socket Programming Assignment!");
    res.end();
  });
};
