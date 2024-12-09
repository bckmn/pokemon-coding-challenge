import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon Battle API",
      version: "1.0.0",
      description: "API for simulating Pokemon battles",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    components: {
      schemas: {
        Evolution: {
          type: "object",
          properties: {
            num: { type: "string" },
            name: { type: "string" },
          },
          required: ["num", "name"],
        },
        Pokemon: {
          type: "object",
          properties: {
            id: { type: "number" },
            num: { type: "string" },
            name: { type: "string" },
            img: { type: "string" },
            type: { 
              type: "array",
              items: { type: "string" },
            },
            height: { type: "string" },
            weight: { type: "string" },
            candy: { type: "string" },
            candy_count: { type: "number" },
            egg: { type: "string" },
            spawn_chance: { type: "number" },
            avg_spawns: { type: "number" },
            spawn_time: { type: "string" },
            multipliers: {
              type: "array",
              items: { type: "number" },
              nullable: true,
            },
            weaknesses: {
              type: "array",
              items: { type: "string" },
            },
            prev_evolution: {
              type: "array",
              items: { $ref: "#/components/schemas/Evolution" },
            },
            next_evolution: {
              type: "array",
              items: { $ref: "#/components/schemas/Evolution" },
            },
          },
          required: ["id", "num", "name", "type", "height", "weight"],
        },
        Team: {
          type: "object",
          properties: {
            trainer: { type: "string" },
            pokemon: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["trainer", "pokemon"],
        },
        BattleResult: {
          type: "object",
          properties: {
            winner: { type: "string" },
            battleLog: {
              type: "array",
              items: { type: "string" },
            },
            finalScore: {
              type: "object",
              properties: {
                team1Score: { type: "number" },
                team2Score: { type: "number" },
              },
              required: ["team1Score", "team2Score"],
            },
          },
          required: ["winner", "battleLog", "finalScore"],
        },
        PokemonResponse: {
          type: "object",
          properties: {
            pokemon: {
              type: "array",
              items: { $ref: "#/components/schemas/Pokemon" },
            },
          },
          required: ["pokemon"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
