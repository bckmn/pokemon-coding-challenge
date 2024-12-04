import dotenv from "dotenv";
import express from "express";

import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use('/api', router);

dotenv.config();

const port = process.env["PORT"] || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default router;