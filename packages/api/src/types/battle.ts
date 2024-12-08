import { array, fields, Infer, string } from "tiny-decoders";

export const teamCodec = fields({
    trainer: string,
    pokemon: array(string),
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
