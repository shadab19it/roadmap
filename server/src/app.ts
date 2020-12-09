import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import { mysqlDB } from "./dbConfig";
import { MysqlError } from "mysql";
import cors from "cors";
import expressSession from "express-session";
import dotenv from "dotenv";
// My Routes
import member from "./routes/members";
import featureRequest from "./routes/featureRequest";
import featureComment from "./routes/featureComment";
import featureVotes from "./routes/featureVotes";
import commentLikes from "./routes/commentLikes";
import passport from "passport";
import InitPassport from "./routes/passportConfig/InitPassport";

dotenv.config();
const app: Application = express();
/**
 * Initilisation Passport Strategy
 */
InitPassport(passport);

// middlewere
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.json());
app.use(cors());
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mysqlDB.connect((err: MysqlError) => {
  if (err) {
    console.log("db not Connected");
  }
  console.log("DB Connected!");
});

app.use("/api/member", member);
app.use("/api/feature", featureRequest);
app.use("/api/feature/comment", featureComment);
app.use("/api/feature/vote", featureVotes);
app.use("/api/comment/like", commentLikes);

const PORT: number | string = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT} >> http://localhost:${PORT}`);
});
