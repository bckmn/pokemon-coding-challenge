import { type Request, type Response } from "express";

import { pokemon, type PokemonResponse } from "../assets/pokemon.js";

export function getAllPokemon(_req: Request, res: Response<PokemonResponse>) {
  res.send({
    "pokemon": pokemon,
  });
}
