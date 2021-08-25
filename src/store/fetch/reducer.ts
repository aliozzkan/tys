import { Action } from "./type";

interface FetchReducer {
  [key: string]: {
    status: "fulfilled" | "rejected" | "pending" | null;
    data: any;
    message: string | null;
  };
}

export function fetchReducer(state = {}, action: Action): FetchReducer {
  switch (action.type) {
    case "KEY_PENDING":
      return {
        ...state,
        [action.payload.key]: {
          message: null,
          status: "pending",
          data: null,
        },
      };
    case "KEY_REJECTED":
      return {
        ...state,
        [action.payload.key]: {
          message: action.payload.message,
          data: null,
          status: "rejected",
        },
      };
    case "KEY_FULFILLED":
      return {
        ...state,
        [action.payload.key]: {
          message: null,
          data: action.payload.data,
          status: "fulfilled",
        },
      };
    default:
      return {
        ...state,
      };
  }
}
