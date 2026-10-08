import express from "express";
import createUserDocument from "../models/user.js";
import hashPassword from "../utils/passwordUtils.js";
import createUser from "../repositories/userRepository.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Routes d'authentification OK");
});

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  const database = req.app.locals.database;

  const passwordHash = await hashPassword(password);

  const userDocument = createUserDocument({
    email,
    passwordHash,
    username,
  });

  const result = await createUser(database, userDocument);

  res.status(201).json({
    message: "Utilisateur créé avec succès",
    userId: result.insertedId,
  });
});

export default router;
