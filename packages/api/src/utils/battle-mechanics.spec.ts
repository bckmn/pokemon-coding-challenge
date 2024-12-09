import { expect } from "chai";

import { Team } from "../types/battle";

import { simulateBattle } from "./battle-mechanics";
import { PokemonName } from "../assets/pokemon.js";


describe("Battle Mechanics", () => {
  describe("simulateBattle", () => {
    it("should correctly simulate a battle between two teams", () => {
      const team1: Team = {
        trainer: "Ash",
        pokemon: ["Bulbasaur", "Ivysaur"],
      } as Team;
  
      const team2: Team = {
        trainer: "Gary",
        pokemon: ["Ivysaur", "Bulbasaur"],
      };
  
      const result = simulateBattle(team1, team2);
  
      expect(result).to.have.property("winner");
      expect(result).to.have.property("battleLog").that.is.an("array");
      expect(result).to.have.property("finalScore").that.has.all.keys("team1Score", "team2Score");
      expect(result.battleLog[0]).to.include("Battle between Ash's team and Gary's team begins!");
    });
  
    it("should handle teams of different sizes by using the smaller team length", () => {
      const team1: Team = {
        trainer: "Ash",
        pokemon: ["Bulbasaur"],
      };
  
      const team2: Team = {
        trainer: "Gary",
        pokemon: ["Ivysaur", "Bulbasaur"],
      };
  
      const result = simulateBattle(team1, team2);
      expect(result.battleLog).to.have.lengthOf.at.least(3);
    });
  
    it("should throw an error when invalid Pokemon names are provided", () => {
      const team1: Team = {
        trainer: "Ash",
        pokemon: ["NonexistentPokemon" as PokemonName],
      };
  
      const team2: Team = {
        trainer: "Gary",
        pokemon: ["Bulbasaur"],
      };
  
      const result = simulateBattle(team1, team2);
      expect(result.battleLog).to.include("Invalid Pokemon name NonexistentPokemon used by Team 1");
    });
  });
  
  describe("Type effectiveness calculations", () => {
    it("should apply type advantages correctly", () => {
      const team1: Team = {
        trainer: "Ash",
        pokemon: ["Bulbasaur"],
      };
  
      const team2: Team = {
        trainer: "Gary",
        pokemon: ["Charmander"],
      };
  
      const result = simulateBattle(team1, team2);
      expect(result.battleLog.some(log => log.includes("super effective"))).to.be.true;
    });
  });
  
  describe("Score calculation", () => {
    it("should calculate scores correctly for a tie", () => {
      const team1: Team = {
        trainer: "Ash",
        pokemon: ["Bulbasaur"],
      };
  
      const team2: Team = {
        trainer: "Gary",
        pokemon: ["Bulbasaur"],
      };
  
      const result = simulateBattle(team1, team2);
      expect(result.finalScore.team1Score).to.equal(result.finalScore.team2Score);
    });
  });
  
  it("should validate team sizes", () => {
    const team1: Team = {
      trainer: "Ash",
      pokemon: [],
    };
  
    const team2: Team = {
      trainer: "Gary",
      pokemon: ["Bulbasaur"],
    };
  
    const result = simulateBattle(team1, team2);
    expect(result.battleLog).to.have.lengthOf(2);
  });
});
