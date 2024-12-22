import { Router } from "express";
import { initGame, startGame, leaderboard, endGame, checkCharacterPosition } from "../controllers/gameController.js";
import { clearSessionMiddleware } from "../middlewares/clearSessionMiddleware.js";

const router = Router();

router.post("/init", initGame);
router.post("/start", startGame);
router.post("/check", checkCharacterPosition);
router.get("/leaderboard", clearSessionMiddleware, leaderboard);
router.post("/end", endGame);

export default router;
