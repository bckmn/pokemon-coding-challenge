import { Router } from "express";

import { getAllPokemon, simulatePokemonBattle } from "../controllers/index.js";

const router = Router();
router.get("/pokemon", getAllPokemon);
router.post("/battle", simulatePokemonBattle);

export default router;
