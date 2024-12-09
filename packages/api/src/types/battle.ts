import { array, fields, Infer, string } from "tiny-decoders";
import { pokemonNameCodec } from "../assets/pokemon.js";

export const teamCodec = fields({
  trainer: string,
  pokemon: array(pokemonNameCodec),
});

export type Team = Infer<typeof teamCodec>;

export type BattleResult = {
    winner: string;
    battleLog: Array<string>;
    finalScore: {
      team1Score: number;
      team2Score: number;
    };
  };
