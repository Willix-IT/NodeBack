"use strict";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import restaurantsRouter from "./routes/api/restaurants.js";
import homeRouter from "./routes/api/home.js";

import { openDatabase } from './database.js';

const app = express();
const port = 3002;

app.disable("x-powered-by");
app.set("view engine", "pug");
app.use(json());
app.use(urlencoded({ extended: false }));

// App middlewares
app.use(morgan("dev"));
app.use("/static", express.static("./static"));

// App routes
app.use("/", homeRouter);
app.use("/restaurants", restaurantsRouter);

// App initialisation
openDatabase().then(() => {
  console.log("connected")
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});


