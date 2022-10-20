import express from "express";
const homeRouter = express.Router();

homeRouter.get("/", async function (req, res, next) {


  res.render("index");
});

export default homeRouter;