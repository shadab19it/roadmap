import { Request, Response } from "express";
import { mysqlDB } from "../dbConfig";
import { IResponse, defaultErr } from "./featureReques";
import bcrypt from "bcrypt";

export interface Member {
  id?: number;
  name: string;
  email: string;
  password: string;
  profile_image_path: string;
  membertype: string;
}

export const SignUpUser = async (_req: Request, _res: Response) => {
  const { name, profile_image_path, email, password } = _req.body as Member;
  let hashPassword;
  try {
    if (password !== "") {
      hashPassword = await bcrypt.hash(password, 10);
    }
  } catch (err) {
    return _res.status(404).json({ error: "Password is Empty" });
  }

  const memberInfo = {
    name,
    profile_image_path,
    email,
    password: hashPassword,
    membertype: "guest",
  };

  let query = `INSERT INTO members SET ?`;
  mysqlDB.query(query, memberInfo, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Member not save in db" });
    }
    return _res.status(201).json({ msg: "You have successfully Signup , You now Login !", member_id: result.insertId });
  });
};

export const loginUser = (_req: Request | any, _res: Response) => {
  let User = _req.user as Member;
  User.password = undefined;

  if (!_req.user) {
    return _res.status(401).json({ msg: "Invalid Username and Password" });
  }
  return _res.status(201).json({ msg: "Your are Loged In", user: User });
};

// If Failed Login User
export const LoginFail = (_req: Request, _res: Response) => {
  return _res.status(400).json({ msg: "Invalid Username and password" });
};

// getAllmember
export const getAllmembers = (_req: Request, _res: Response) => {
  let query = "SELECT * FROM members";
  mysqlDB.query(query, (err: defaultErr, results: Member[]) => {
    if (err) {
      return _res.status(400).json({ error: "members Info not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const getMemberbyId = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM members WHERE id = ${_req.params.id}`;
  mysqlDB.query(query, (err: defaultErr, results: Member) => {
    if (err) {
      return _res.status(400).json({ error: "member not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const getUpdateById = (_req: Request, _res: Response) => {
  const { name, profile_image_path } = _req.body as Member;
  let query = `UPDATE members SET ? WHERE id = ${_req.params.id}`;
  mysqlDB.query(query, { name, profile_image_path }, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "member not update in db" });
    }
    return _res.status(201).json({ msg: "Update member successufull" });
  });
};

export const logoutUser = (_req: Request, _res: Response) => {
  _req.logout();
  return _res.status(201).json({ msg: "Your are Logout" });
};

export const isAuthenticated = (_req: Request | any, res: Response, next) => {
  if (true) {
    return next();
  }
  return res.status(401).json({ msg: "You are not Loged in" });
};
