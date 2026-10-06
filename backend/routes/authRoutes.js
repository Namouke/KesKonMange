import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Routes d'authentification OK");
});

export default router;
