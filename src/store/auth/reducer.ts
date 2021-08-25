import { SET_JWT_DATA } from "./constants";
import { AuthReducer, Action } from "./types";

const initialValue: AuthReducer = {
  jwt: null,
  decoded: null,
  project: null,
  user: null,
  isLoggedIn: "freeze",
};

export function authReducer(
  state: AuthReducer = initialValue,
  action: Action
): AuthReducer {
  switch (action.type) {
    case SET_JWT_DATA:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: "noHaveProject",
      };
    case "SET-DATA-AND-PROJECT":
      return {
        ...action.payload,
        isLoggedIn: "loginIn"
      }
    case "SET-PROJECT":
      return {
        ...state,
        project: action.payload,
        isLoggedIn: "loginIn"
      };
    case "CLEAR-AUTH":
      return {
        ...initialValue,
        isLoggedIn: "unLoginIn"
      };
    default:
      return {
        ...state,
      };
  }
}
