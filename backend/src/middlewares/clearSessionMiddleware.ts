import { NextFunction, Request, Response } from "express";

export const clearSessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      res.status(500).send("Failed to destroy session");
      return;
    }
    res.clearCookie("connect.sid");
    next();
  });
};
