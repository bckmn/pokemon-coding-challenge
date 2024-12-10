import { pokemon, PokemonName, type Pokemon } from "../assets/pokemon.js";
import { BattleResult, Team } from "../types/battle.js";

const TYPE_EFFECTIVENESS: Record<string, string[]> = {
  Fire: ["Grass", "Ice"],
  Water: ["Fire", "Ground"],
  Electric: ["Water", "Flying"],
  Grass: ["Water", "Ground"],
  Ice: ["Grass", "Flying"],
  Fighting: ["Normal", "Ice"],
  Poison: ["Grass"],
  Ground: ["Fire", "Electric", "Poison"],
  Flying: ["Grass", "Fighting"],
  Psychic: ["Fighting", "Poison"],
};

export function simulateBattle(team1: Team, team2: Team): BattleResult {
  const battleLog = [`Battle between ${team1.trainer}'s team and ${team2.trainer}'s team begins!`];
    
  let team1Score = 0;
  let team2Score = 0;
    
  const maxBattles = Math.min(team1.pokemon.length, team2.pokemon.length);
    
  for (let i = 0; i < maxBattles; i++) {
    const maybePokemonOne = team1.pokemon[i];
    const maybePokemonTwo = team2.pokemon[i];
    if (maybePokemonOne === undefined || maybePokemonTwo === undefined) {
      throw new Error("No more Pokemon available for battle");
    }
    const pokemon1 = getPokemonByName(maybePokemonOne);
    const pokemon2 = getPokemonByName(maybePokemonTwo);

    if (pokemon1 === undefined) {
      battleLog.push(`Invalid Pokemon name ${team1.pokemon[i]} used by Team 1`);
      continue;
    }
      
    if (pokemon2 === undefined) {
      battleLog.push(`Invalid Pokemon name ${team2.pokemon[i]} used by Team 2`);
      continue;
    }
    battleLog.push(`Round ${i + 1}:`);
    const roundResult = battlePokemon(pokemon1, pokemon2, battleLog);
      
    if (roundResult > 0) {
      team1Score++;
      battleLog.push(`${pokemon1.name} wins the round!`);
    } else if (roundResult < 0) {
      team2Score++;
      battleLog.push(`${pokemon2.name} wins the round!`);
    } else {
      battleLog.push("It's a tie!");
      team1Score += 0.5;
      team2Score += 0.5;
    }
  }
    
  const winner = team1Score > team2Score ? team1.trainer : team2.trainer;
  battleLog.push(`Battle ends! ${winner} wins with a score of ${Math.max(team1Score, team2Score)} - ${Math.min(team1Score, team2Score)}!`);
 
  return {
    winner,
    battleLog: battleLog,
    finalScore: {
      team1Score,
      team2Score,
    },
  };
}

function calculateTypeAdvantage(attacker: Pokemon, defender: Pokemon, battleLog: Array<string>): number {
  let advantage = 1;
  attacker.type.forEach(attackerType => {
    if (TYPE_EFFECTIVENESS[attackerType] !== undefined) {
      defender.type.forEach(defenderType => {
        if (TYPE_EFFECTIVENESS[attackerType]?.includes(defenderType)) {
          advantage *= 1.5;
          battleLog.push(`${attacker.name}'s ${attackerType} type is super effective against ${defender.name}'s ${defenderType} type!`);
        }
      });
    }
  });

  return advantage;
}

function battlePokemon(pokemon1: Pokemon, pokemon2: Pokemon, battleLog: Array<string>): number {
  const p1Strength = calculatePokemonStrength(pokemon1);
  const p2Strength = calculatePokemonStrength(pokemon2);

  const typeAdvantage1 = calculateTypeAdvantage(pokemon1, pokemon2, battleLog);
  const typeAdvantage2 = calculateTypeAdvantage(pokemon2, pokemon1, battleLog);

  const p1FinalStrength = p1Strength * typeAdvantage1;
  const p2FinalStrength = p2Strength * typeAdvantage2;

  battleLog.push(`${pokemon1.name} (Strength: ${p1FinalStrength.toFixed(2)}) vs ${pokemon2.name} (Strength: ${p2FinalStrength.toFixed(2)})`);

  return p1FinalStrength - p2FinalStrength;
}

function calculatePokemonStrength(pokemon: Pokemon): number {
  let strength = pokemon.spawn_chance * 100;
    
  if (pokemon.multipliers !== null) {
    strength += Math.max(...pokemon.multipliers) * 50;
  }

  const maybeWeight = pokemon.weight.split(" ")[0];
  const maybeHeight = pokemon.height.split(" ")[0];
  if (maybeWeight === undefined || maybeHeight === undefined) {
    throw new Error(`The weight or height of ${pokemon.name} could not be parsed`);
  }

  const weight = parseFloat(maybeWeight);
  const height = parseFloat(maybeHeight);
  strength += (weight + height) * 2;

  return strength;
}

function getPokemonByName(name: PokemonName): Pokemon | undefined {
  return pokemon.find(p => p.name === name);
}
