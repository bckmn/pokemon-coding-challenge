import { Router } from "express";

import { getAllPokemon, simulatePokemonBattle } from "../controllers/index.js";

const router = Router();

/**
 * @openapi
 * /api/pokemon:
 *   get:
 *     summary: Get all Pokemon
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: List of all Pokemon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokemonResponse'
 *       500:
 *         description: Server error
 */
router.get("/pokemon", getAllPokemon);

/**
 * @openapi
 * /api/battle:
 *   post:
 *     summary: Simulate a battle between two Pokemon teams
 *     tags: [Battle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team1:
 *                 $ref: '#/components/schemas/Team'
 *               team2:
 *                 $ref: '#/components/schemas/Team'
 *             required:
 *               - team1
 *               - team2
 *     responses:
 *       200:
 *         description: Battle result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BattleResult'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
router.post("/battle", simulatePokemonBattle);

export default router;
