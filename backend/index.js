import express from "express";
import connectToDatabase from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend KesKonMange OK");
});

const database = await connectToDatabase();

app.locals.database = database;

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
