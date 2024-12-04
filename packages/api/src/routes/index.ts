import { Router } from "express";

import { helloWorld } from "../controllers";

const router = Router();
router.get("/", helloWorld);

export default router;
