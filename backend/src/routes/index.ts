import { Router } from "express";
import { initGame, startGame, getLeaderboard, endGame } from "../controllers/gameController.js";
import { clearSessionMiddleware } from "../middlewares/clearSessionMiddleware.js";

const router = Router();

router.post("/init", initGame);
router.post("/start", startGame);
router.get("/leaderboard", clearSessionMiddleware, getLeaderboard);
router.post("/end", endGame);

export default router;
