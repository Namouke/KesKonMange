import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend KesKonMange OK");
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
