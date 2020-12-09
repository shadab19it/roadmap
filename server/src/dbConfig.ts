import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const mysqlDB = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  insecureAuth: true,
  database: "roadmap",
});
