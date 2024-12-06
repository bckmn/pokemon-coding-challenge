export type Team = {
    trainer: string;
    pokemon: Array<string>;
  };
  
export type BattleResult = {
    winner: string;
    battleLog: Array<string>;
    finalScore: {
      team1Score: number;
      team2Score: number;
    };
  };
