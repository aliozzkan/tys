import { SET_JWT_DATA } from "./constants";
import {
  AuthReducer,
  ClearAuthAction,
  SetDataAction,
  SetProjectAction,
  SetDataAndProjectAction,
} from "./types";

export function setAuth(data: SetDataAction["payload"]): SetDataAction {
  return {
    type: SET_JWT_DATA,
    payload: data,
  };
}

export function setProject(project: any): SetProjectAction {
  return {
    type: "SET-PROJECT",
    payload: project,
  };
}

export function setAuthWithProject(data: SetDataAndProjectAction["payload"]): SetDataAndProjectAction {
  return {
    type: "SET-DATA-AND-PROJECT",
    payload: data
  }
}


export function clearAuth(): ClearAuthAction {
  return {
    type: "CLEAR-AUTH",
  };
}
