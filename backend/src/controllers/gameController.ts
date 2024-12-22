import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StartBody, EndBody, ClickPositionType, CheckBody, CharacterType } from "../@types/express.js";
import { clearSessionMiddleware } from "../middlewares/clearSessionMiddleware.js";
import { checkPositionForCharacter, getRandomCharacters } from "../services/characterServices.js";
import prisma from "../models/prisma.js";
import { addRecordToLeaderboard, getLeaderboard } from "../services/gameServices.js";

export const initGame = async (req: Request, res: Response) => {
  const charactersToFind = await getRandomCharacters(3);
  const characterNames = charactersToFind.map((character) => character.name);
  req.session.charactersToFind = characterNames;

  res.status(200).json(characterNames);
};

export const startGame = async (req: Request, res: Response) => {
  req.session.startTime = Date.now();

  res.sendStatus(200);
};

export const checkCharacterPosition = async (req: Request<{}, {}, CheckBody, {}>, res: Response) => {
  if (!req.session || !req.session.startTime || !req.session.charactersToFind) {
    res.sendStatus(400);
    return;
  }

  const characterName = req.body.characterName;
  const clickPosition = req.body.clickPosition;
  
  if (await checkPositionForCharacter(clickPosition, characterName)) {
    req.session.charactersToFind = req.session.charactersToFind.filter((name) => name !== characterName);
    
    if (req.session.charactersToFind.length === 0) {
      const endTime = Date.now();
      const elapsedTime = Math.floor(endTime - req.session.startTime);
      req.session.elapsedTime = elapsedTime;

      res.status(200).json({ charactersToFind: req.session.charactersToFind, elapsedTime: elapsedTime });
      return;
    }

    res.status(200).json({ charactersToFind: req.session.charactersToFind, elapsedTime: null });
  } else {
    res.sendStatus(400);
  }
};

export const leaderboard = async (req: Request, res: Response) => {
  const leaderboard = await getLeaderboard(10);

  res.status(200).json(leaderboard);
};

export const endGame = async (req: Request<{}, {}, EndBody, {}>, res: Response) => {
  const { charactersToFind, elapsedTime } = req.session;
  const { username } = req.body;

  if (!elapsedTime || !charactersToFind || charactersToFind.length > 0) {
    res.sendStatus(400);
    return;
  }

  await addRecordToLeaderboard(username, elapsedTime);

  clearSessionMiddleware(req, res, () => {
    res.sendStatus(200);
  });
};
