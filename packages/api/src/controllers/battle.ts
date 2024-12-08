import { type Request, type Response } from "express";
import { fields, format, Infer } from "tiny-decoders";

import { BattleResult, teamCodec } from "../types/battle.js";
import { simulateBattle } from "../utils/battle-mechanics.js";

const battleCodec = fields({
  team1: teamCodec,
  team2: teamCodec,
});

type PokemonBattle = Infer<typeof battleCodec>;

export function simulatePokemonBattle(
  req: Request<PokemonBattle>,
  res: Response<BattleResult | { errorMessage: string }>,
) {
  const maybeTeams = battleCodec.decoder(req.body);
  if (maybeTeams.tag === "DecoderError") {
    res.status(400).json({
      errorMessage: format(maybeTeams.error),
    });
    return;
  }

  const result = simulateBattle(maybeTeams.value.team1, maybeTeams.value.team2);
  
  res.json(result);
}
