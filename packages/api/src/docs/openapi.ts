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
        Pokemon: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            img: { type: "string" },
          },
          required: ["id", "name"],
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
