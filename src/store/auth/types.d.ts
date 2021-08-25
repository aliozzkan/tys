import { Jwt } from "models";
import { SET_JWT_DATA } from "./constants";

export type AuthReducer = {
  jwt: string | null;
  decoded: Jwt | null;
  user: any;
  project: any;
  isLoggedIn: "freeze" | "noHaveProject" | "loginIn" | "unLoginIn";
};

export type SetDataAction = {
  type: SET_JWT_DATA;
  payload: Omit<AuthReducer, "project" | "isLoggedIn">;
};

export type SetDataAndProjectAction = {
  type: "SET-DATA-AND-PROJECT",
  payload: Omit<AuthReducer, "isLoggedIn">
}

export type SetProjectAction = {
  type: "SET-PROJECT";
  payload: any;
};

export type ClearAuthAction = {
  type: "CLEAR-AUTH";
};

export type Action = SetDataAction | SetProjectAction | ClearAuthAction | SetDataAndProjectAction;
