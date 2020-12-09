import { createContext } from "react";
import { User } from "../services/AuthService";

export interface AppContext {
  currentUser: User;
  loading: boolean;
}

export const UserContext = createContext<AppContext>({
  currentUser: {
    id: -1,
    name: "",
    email: "",
    profile_image_path: "",
    membertype: "",
  },
  loading: false,
});
