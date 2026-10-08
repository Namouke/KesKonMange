import express from "express";
import createUserDocument from "../models/user.js";
import hashPassword from "../utils/passwordUtils.js";
import createUser, { findUserByEmail } from "../repositories/userRepository.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Routes d'authentification OK");
});

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires",
    });
  }

  const database = req.app.locals.database;

  const existingUser = await findUserByEmail(database, email);

  if (existingUser) {
    return res.status(409).json({
      message: "Un compte existe déjà avec cet e-mail",
    });
  }

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
