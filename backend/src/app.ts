import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { CharacterType, ClickPositionType, EndBody, StartBody } from "./@types/express.js";
import { checkPositions } from "./utils/positionUtils.js";
import { clearSessionMiddleware } from "./middlewares/clearSessionMiddleware.js";

declare module "express-session" {
  interface SessionData {
    userId: string;
    charactersToFind: CharacterType[];
    clickPositions: ClickPositionType[];
  }
}

const app = express();
const PORT = parseInt(process.env.PORT || "3000");
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 24 * 60 * 60 * 1000,
      dbRecordIdIsSessionId: false,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use("/start", (req: Request<{}, {}, StartBody, {}>, res: Response) => {
  req.session.userId = uuid();
  req.session.charactersToFind = req.body;
  res.sendStatus(200);
});

app.use("/leaderboard", clearSessionMiddleware, async (req: Request, res: Response) => {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: { time: "asc" },
    take: 10,
  });
  res.status(200).json(leaderboard);
});

app.use("/end", async (req: Request<{}, {}, EndBody, {}>, res: Response) => {
  const { userId, charactersToFind } = req.session;
  const { username, time, clickPositions } = req.body;

  if (!userId || !charactersToFind || !clickPositions) {
    res.sendStatus(400);
    return;
  }

  if (!checkPositions(clickPositions, charactersToFind)) {
    res.sendStatus(400);
    return;
  }

  await prisma.leaderboard.create({
    data: {
      username,
      time,
    },
  });

  clearSessionMiddleware(req, res, () => {
    res.sendStatus(200);
  });
});

app.listen(PORT, () => console.log("App is live"));
