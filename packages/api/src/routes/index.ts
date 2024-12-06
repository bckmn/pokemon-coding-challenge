import { Router } from "express";

import { getAllPokemon } from "../controllers/index.js";

const router = Router();
router.get("/pokemon", getAllPokemon);

export default router;
