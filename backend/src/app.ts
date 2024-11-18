import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { CharacterType, ClickPositionType } from "./@types/express.js";
import { isBetween } from "./utils/number.js";

declare module "express-session" {
  interface SessionData {
    userId: string;
    charactersToFind: CharacterType[];
    clickPositions: ClickPositionType[];
  }
}

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

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
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/start", (req: Request<{}, {}, CharacterType[], {}>, res: Response) => {
  req.session.userId = uuid();
  req.session.charactersToFind = req.body;
  res.sendStatus(200);
});

app.use("/end", (req: Request<{}, {}, ClickPositionType[], {}>, res: Response) => {
  const { userId, charactersToFind } = req.session;
  const clickPositions = req.body;
  if (!userId || !charactersToFind || !clickPositions) {
    res.sendStatus(400);
    return;
  }
  const checkPositions = clickPositions.every((clickPosition) => {
    return charactersToFind.some((character) => {
      return character.positions.some((position) => {
        return (
          isBetween(clickPosition.x, position.left, position.right) &&
          isBetween(clickPosition.y, position.top, position.bottom)
        );
      });
    });
  });

  if (checkPositions) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.listen(PORT, () => console.log("App is live"));
