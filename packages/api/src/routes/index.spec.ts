import { expect } from "chai";
import express from "express";
import request from "supertest";

import routes from "../routes/index.js";

describe("Pokemon API", () => {
  const app = express();
  app.use(routes);

  it("GET / returns 404", async () => {
    await request(app)
      .get("/")
      .expect(404);
  });

  it("GET /pokemon returns all pokemon", async () => {
    const response = await request(app)
      .get("/pokemon")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.pokemon).to.have.lengthOf(151);
  });
});