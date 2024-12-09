import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { specs } from "./docs/openapi.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
  swaggerOptions: {
    url: "/api-docs/swagger.json",
  },
}));

app.get("/api-docs/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

app.use("/api", router);

dotenv.config();

const port = process.env["PORT"] || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
