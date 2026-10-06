import express from "express";
import connectToDatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend KesKonMange OK");
});

await connectToDatabase();

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
