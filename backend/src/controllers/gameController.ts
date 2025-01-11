import { Request, Response } from "express";
import { EndBody, CheckBody } from "../@types/express.js";
import { clearSessionMiddleware } from "../middlewares/clearSessionMiddleware.js";
import { checkPositionForCharacter, getRandomCharacters } from "../services/characterServices.js";
import { addRecordToLeaderboard, getLeaderboard } from "../services/gameServices.js";

export const initGame = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  const charactersToFind = await getRandomCharacters(3);
  const characterNames = charactersToFind.map((character) => character.name);
  req.session.charactersToFind = characterNames;

  res.status(200).json(characterNames);
};

export const startGame = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  if (!req.session.charactersToFind) {
    res.status(400).json({ message: "No valid session was found" });
    return;
  }
  req.session.startTime = Date.now();

  res.status(200).json({ message: "Game started" });
};

export const checkCharacterPosition = async (req: Request<{}, {}, CheckBody, {}>, res: Response) => {
  if (!req.session || !req.session.startTime || !req.session.charactersToFind) {
    res.status(400).json({ message: "No valid session was found" });
    return;
  }

  const characterName = req.body.characterName;
  const clickPosition = req.body.clickPosition;

  if (!(await checkPositionForCharacter(clickPosition, characterName))) {
    res.status(400).json({ message: "Incorrect position for the character" });
    return;
  }

  req.session.charactersToFind = req.session.charactersToFind.filter((name) => name !== characterName);

  if (req.session.charactersToFind.length === 0) {
    const endTime = Date.now();
    const elapsedTime = endTime - req.session.startTime;
    req.session.elapsedTime = elapsedTime;

    res.status(200).json({ charactersToFind: req.session.charactersToFind, elapsedTime: elapsedTime });
    return;
  }

  res.status(200).json({ charactersToFind: req.session.charactersToFind, elapsedTime: null });
};

export const leaderboard = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  const leaderboard = await getLeaderboard(10);

  res.status(200).json(leaderboard);
};

export const endGame = async (req: Request<{}, {}, EndBody, {}>, res: Response) => {
  const { charactersToFind, elapsedTime } = req.session;
  const { username } = req.body;

  if (!elapsedTime || !charactersToFind || charactersToFind.length > 0) {
    res.status(400).json({ message: "Could not save result to leaderboard" });
    return;
  }

  await addRecordToLeaderboard(username, elapsedTime);

  clearSessionMiddleware(req, res, () => {
    res.sendStatus(200);
  });
};
