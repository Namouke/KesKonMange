import express from "express";
import connectToDatabase from "./config/database.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend KesKonMange OK");
});

connectToDatabase();

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
