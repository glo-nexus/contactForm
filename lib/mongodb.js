import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // put your connection string in .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reuse connection during dev (to prevent too many connections on hot reload)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
