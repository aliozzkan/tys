import { SET_ACTIVE_ITEM_INDEX, SET_APP_NAME, SET_CAMPUS } from "./constants";

type SelectedCampus = {
  id: number;
  name: string;
}

export interface AppReducer {
  appName: string;
  activeItemIndex: number | null;
  selectedCampus: SelectedCampus;
}

export interface SetAppName {
  type: SET_APP_NAME;
  payload: string;
}

export interface SetActiveItemIndex {
  type: SET_ACTIVE_ITEM_INDEX;
  payload: number;
}
export interface SetCampus {
  type: SET_CAMPUS;
  payload: SelectedCampus;
}

export type Action = SetAppName | SetActiveItemIndex | SetCampus;
