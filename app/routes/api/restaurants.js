import express from "express";
const restaurantsRouter = express.Router();
import { getAllRestaurants, getSortedRestaurants, getAllTypeOfRestaurants, getTypedRestaurants } from "../../database.js";

restaurantsRouter.get("/", async function (req, res, next) {
  let allRestaurants = await getAllRestaurants();
  console.log(allRestaurants);
  res.render("searchRestos", { restaurants: allRestaurants });
});

restaurantsRouter.post("/", async function (req, res, next) {
  let sortedRestaurants = await getSortedRestaurants(req.body.name);
  res.render("searchRestos", { restaurants: sortedRestaurants });
});

restaurantsRouter.get("/typedRestaurants", async function (req, res, next) {
  let sortedRestaurants = await getAllTypeOfRestaurants();
  res.render("searchByType", { typeCuisine: sortedRestaurants[0], borough: sortedRestaurants[1] });
});

restaurantsRouter.post("/typedRestaurants", async function (req, res, next) {
  let sortedRestaurants = await getTypedRestaurants(req.body.cuisine, req.body.borough);
  res.render("searchRestos", { restaurants: sortedRestaurants });
});

export default restaurantsRouter;
