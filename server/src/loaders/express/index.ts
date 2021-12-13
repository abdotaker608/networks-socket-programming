import { Express } from "express";

export const loadApp = (app: Express) => {
  app.get("/", (req, res) => {
    res.write("Socket Programming Assignment!");
    res.end();
  });
};
