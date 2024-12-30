import 'dotenv/config'
import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import router from "./routes/index.js";

declare module "express-session" {
  interface SessionData {
    userId: string;
    charactersToFind: string[];
    startTime: number;
    elapsedTime: number;
  }
}

const app = express();
const PORT = parseInt(process.env.PORT || "3000");
const prisma = new PrismaClient();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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

app.use("/", router);

app.listen(PORT, () => console.log("App is live"));
