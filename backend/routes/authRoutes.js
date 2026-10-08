import express from "express";
import createUserDocument from "../models/user.js";
import hashPassword, { comparePassword } from "../utils/passwordUtils.js";
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

  if (password.length < 8) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 8 caractères",
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "L'e-mail et le mot de passe sont obligatoires",
    });
  }

  const database = req.app.locals.database;

  const user = await findUserByEmail(database, email);

  if (!user) {
    return res.status(401).json({
      message: "E-mail ou mot de passe incorrect",
    });
  }

  const passwordIsValid = await comparePassword(password, user.passwordHash);

  if (!passwordIsValid) {
    return res.status(401).json({
      message: "E-mail ou mot de passe incorrect",
    });
  }

  res.status(200).json({
    message: "Connexion réussie",
  });
});

export default router;
