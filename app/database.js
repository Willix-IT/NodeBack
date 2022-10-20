// Connexion persistente à la base MongoDB
import { MongoClient } from "mongodb";
const DB_NAME = "ny";

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

const DB_COLLECTION = "restaurants";

// Initialise une connexion à la base MongoDB
const client = new MongoClient(CONNECTION_STRING);
let db = null;

export function openDatabase() {
  return client.connect().then(() => {
    db = client.db(DB_NAME);
  });
}

export async function getRestaurantsByBorough(borough) {
  const restaurants = await db.collection(DB_COLLECTION);
  let res = await restaurants.find({ borough });
  res = await res.toArray();

  return res;
}

export async function getSortedRestaurants(nameToSearch) {
  const restaurants = await db.collection(DB_COLLECTION);
  let res = await restaurants
    .find(
      { name: { $regex: nameToSearch } },
      { limit: 5, name: 1, _id: 0, address: 1, cuisine: 1 }
    )
    .toArray();
  return res;
}

export async function getAllRestaurants() {
  const restaurants = await db.collection(DB_COLLECTION);
  let res = await restaurants
    .find({}, { limit: 100, name: 1, _id: 0, address: 1, cuisine: 1 })
    .toArray();
  return res;
}

export async function getAllTypeOfRestaurants() {
  const restaurants = await db.collection(DB_COLLECTION);
  const typeCuisine = await restaurants.distinct("cuisine");
  const typeBorough = await restaurants.distinct("borough");
  return [typeCuisine, typeBorough];
}

export async function getTypedRestaurants(cuisine, borough) {
  const restaurants = await db.collection(DB_COLLECTION);
  let res = await restaurants
    .find(
      { cuisine: cuisine, borough: borough },
      { limit: 100, name: 1, _id: 0, address: 1, cuisine: 1 }
    )
    .toArray();
  return res;
}
