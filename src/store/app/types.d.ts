import { SET_ACTIVE_ITEM_INDEX, SET_APP_NAME } from "./constants";

export interface AppReducer {
  appName: string;
  activeItemIndex: number | null;
}

export interface SetAppName {
  type: SET_APP_NAME;
  payload: string;
}

export interface SetActiveItemIndex {
  type: SET_ACTIVE_ITEM_INDEX;
  payload: number;
}

export type Action = SetAppName | SetActiveItemIndex;
