import { type Request, type Response } from "express";

import { type Team, type BattleResult } from "../types/battle.js";
import { simulateBattle } from "../utils/battle-mechanics.js";

export function simulatePokemonBattle(
  req: Request<{ team1: Team; team2: Team }>,
  res: Response<BattleResult | { errorMessage: string }>,
) {
  const { team1, team2 } = req.body;

  if (team1 === undefined) {
    res.status(400).json({
      errorMessage: "Team 1 not provided",
    });
    return;
  }
  
  if (team2 === undefined) {
    res.status(400).json({
      errorMessage: "Team 2 not provided",
    });
    return;
  }
  
  
  if (team1.pokemon === undefined) {
    res.status(400).json({
      errorMessage: "No pokemon provided for Team 1",
    });
    return;
  }
  
  
  if (team2.pokemon === undefined) {
    res.status(400).json({
      errorMessage: "No pokemon provided for Team 2",
    });
    return;
  }
  
  
  if (team1.trainer === undefined) {
    res.status(400).json({
      errorMessage: "No trainer provided for Team 1",
    });
    return;
  }
  
  
  if (team2.trainer === undefined) {
    res.status(400).json({
      errorMessage: "No trainer provided for Team 2",
    });
    return;
  }

  const result = simulateBattle(team1, team2);
  
  res.json(result);
}
