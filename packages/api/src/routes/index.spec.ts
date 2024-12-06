import express, { Express } from "express";
import request from "supertest";

import { pokemon } from "../assets/pokemon.js";
import routes from "../routes/index.js";

describe("Pokemon API", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(routes);
  });

  describe("GET /", () => {
    it("should return 404", async () => {
      await request(app)
        .get("/")
        .expect(404);
    });
  });

  describe("GET /pokemon", () => {
    it("should return all pokemon", async () => {
      const response = await request(app)
        .get("/pokemon")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual({ pokemon });
      expect(response.body.pokemon).toHaveLength(151);
    });
  });
});
