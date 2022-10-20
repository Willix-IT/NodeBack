const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://root:example@mongo:27017";
const client = new MongoClient(url);

async function getAllRestaurants() {
  console.log("auauau")
  await client.connect().then(() => {
    const db = client.db("ny");
    const coll = db.collection("restaurants");
    return new Promise((resolve, reject) => {
      try {
        let result = coll.find(
          {},
          { limit: 20, name: 1, _id: 0, address: 1, cuisine: 1 }
        );
        console.log(result.toArray());
        return resolve(result.toArray());
      } catch (err) {
        return reject(err);
      }
    });
  });
}

async function getSortedRestaurant(name) {
  await client.connect().then(() => {
    const db = client.db("ny");
    const coll = db.collection("restaurants");
    return new Promise((resolve, reject) => {
      return coll
        .find(
          { name: { $regex: name } },
          { limit: 5, name: 1, _id: 0, address: 1, cuisine: 1 }
        )
        .then((res) => {
          resolve(res.toArray());
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

//////////////////////////

module.exports = {
  GetAllRestaurants: async () => {
    let allRestaurants = await getAllRestaurants();
    return allRestaurants;
  },

  GetSortedRestaurant: async (name) => {
    let sortedRestaurants = await getSortedRestaurant(name);
    return sortedRestaurants;
  },
};
