import { API } from "../backendApi";
import { OpenModelMsg, openNotification } from "../components/comman/ErrorHandle/ErrorHandle";
import { IResError } from "./CommentLikeService";
import { setCookie } from "./SetCookie";
import Cookies from "universal-cookie";
import { IResMsg } from "./CommentService";
const cookie = new Cookies();

export interface IAddUser {
  name?: string;
  email: string;
  password: string;
  profile_image_path?: string;
  membertype?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image_path: string;
  membertype: string;
}

export interface IResLogin {
  user: User;
  msg: string;
}
export interface IResSignUp {
  member_id: number;
  msg: string;
}

export const AuthSignUp = async (userInfo: IAddUser, onSuccess: (r: number) => void) => {
  try {
    const res = await fetch(`${API}/member/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResSignUp;
      onSuccess(r.member_id);
      openNotification("success", r.msg);
    } else if (res.body) {
      const r = (await res.json()) as IResError;
      openNotification("error", r.error);
      console.log("Unautherised Erroe" + res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const AuthLogin = async (userInfo: IAddUser, onSuccess: (r: User) => void) => {
  try {
    const res = await fetch(`${API}/member/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResLogin;
      onSuccess(r.user);
      openNotification("success", r.msg);
    } else if (res.status === 400 && res.body) {
      const r = (await res.json()) as IResMsg;
      OpenModelMsg(r.msg)
    } else {
    OpenModelMsg(`${res.status}`)
    }
  } catch (err) {
    OpenModelMsg(err)
  }
};

export const getUserById = async (userId: number, onSuccess: (r: User) => void) => {
  try {
    const res = await fetch(`${API}/member/get/${userId}`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as User[];
      onSuccess(r[0]);
    } else if (res.body) {
      console.log("Unautherised Erroe" + res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const UserLogOut = async (next: any) => {
  if (typeof window !== undefined) {
    cookie.remove("User", { path: "/" });
  }
  next();
  try {
    const res = await fetch(`${API}/member/logout`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResMsg;
      openNotification("success", r.msg);
    } else if (res.body) {
      console.log("Unautherised Erroe" + res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = (user: User, next: any) => {
  if (document.cookie !== undefined) {
    setCookie("User", user, cookie);
  }
  next();
};

export const isAuthenticated = () => {
  if (document.cookie === undefined) {
    return false;
  }
  if (cookie.get("User")) {
    return cookie.get("User");
  }
  return false;
};
