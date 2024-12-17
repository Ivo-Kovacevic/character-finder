import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StartBody, EndBody, ClickPositionType, CheckBody } from "../@types/express.js";
import { clearSessionMiddleware } from "../middlewares/clearSessionMiddleware.js";
import { checkPositionForCharacter } from "../services/characterServices.js";
import prisma from "../models/prisma.js";

export const initGame = async (req: Request, res: Response) => {
  req.session.userId = uuid();

  const charactersToFind = await prisma.character.findMany({
    take: 3,
    select: { name: true },
    orderBy: { id: "asc" },
  });

  const characterNames = charactersToFind.map((character) => character.name);

  res.status(200).json(characterNames);
};

export const startGame = async (req: Request<{}, {}, StartBody, {}>, res: Response) => {
  req.session.startTime = Date.now();
  res.sendStatus(200);
};

export const checkCharacterPosition = async (
  req: Request<{}, {}, CheckBody, {}>,
  res: Response
) => {
  const characterName = req.body.characterName;
  const clickPosition = req.body.clickPosition;

  if (
    !req.session ||
    !req.session.startTime ||
    !req.session.charactersToFind ||
    !req.session.charactersToFind.includes(characterName)
  ) {
    res.sendStatus(400);
    return;
  }

  if (await checkPositionForCharacter(clickPosition, characterName)) {
    req.session.charactersToFind = req.session.charactersToFind.filter(
      (name) => name !== characterName
    );
    if (req.session.charactersToFind.length === 0) {
      const endTime = Date.now();
      const time = Math.floor(endTime - req.session.startTime);
      req.session.elapsedTime = time;
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: { time: "asc" },
    take: 10,
  });
  res.status(200).json(leaderboard);
};

export const endGame = async (req: Request<{}, {}, EndBody, {}>, res: Response) => {
  const { userId, charactersToFind, elapsedTime } = req.session;
  const { username } = req.body;

  if (!userId || !elapsedTime || !charactersToFind || charactersToFind.length > 0) {
    res.sendStatus(400);
    return;
  }

  await prisma.leaderboard.create({
    data: {
      username: username,
      time: elapsedTime,
    },
  });

  clearSessionMiddleware(req, res, () => {
    res.sendStatus(200);
  });
};
