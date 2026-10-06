import process from "node:process";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  await client.connect();
  console.log("Connexion à MongoDB réussie");
}

export default connectToDatabase;
