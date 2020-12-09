import { mysqlDB } from "../../dbConfig";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { Member } from "../../controlers/members";
import { MysqlError } from "mysql";
import { defaultErr } from "../../controlers/featureReques";
dotenv.config();

const InitPassport = (passport:any) => {
  passport.use('local',
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
      const query = `SELECT * FROM members WHERE email = ? `;
      mysqlDB.query(query, [email], async (err, existMember: Member[]) => {
        if (err) {
          return done(err, false);
        }
        if (existMember.length === 0) {
          return done(null, false, { message: "Email does not exist" });
        }
        try {
          if (await bcrypt.compare(password, existMember[0].password)) {
            return done(null, existMember[0]);
          } else {
            return done(null, false, { message: "Password does not matched" });
          }
        } catch (err) {
          return done(err);
        }
      });
    })
  );

  passport.serializeUser((user: Member, done) => done(null, user.id));
  // passport.serializeUser((user: Member, done) => done(null, user));

  // passport.deserializeUser((user, done) => done(null, user));
  passport.deserializeUser((id, done) => {
    let query = `SELECT * FROM members WHERE id = ${id}`;
    mysqlDB.query(query, (err: defaultErr, user: Member[]) => {
      if (err) done(err);

      return done(null, user[0]);
    });
  });
};

export default InitPassport;
