import { mysqlDB } from "../../dbConfig";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { Member } from "../../controlers/members";
dotenv.config();

const InitGoogle = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/member/auth/google/callback",
      },
      (accessToken, refreshToken, profile, email, done) => {
        console.log("profile", profile);
        done(null, profile);
      }
    )
  );
  // passport.serializeUser((user: Member, done) => done(null, user));
  // passport.deserializeUser((user, done) => done(null, user));
};

export default InitGoogle;
