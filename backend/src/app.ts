import express from "express";
import cors from "cors";
import session from "express-session";
import { v4 as uuid } from "uuid";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

app.use(cors());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/start", (req, res) => {
  req.session.userId = uuid();
  res.sendStatus(200);
});

app.use("/end", (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    res.sendStatus(400);
    return;
  }
  
  res.sendStatus(200);
});

app.listen(PORT, () => console.log("App is live"));
