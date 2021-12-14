import { AppReducer, Action } from "./types";
import { SET_ACTIVE_ITEM_INDEX, SET_APP_NAME, SET_CAMPUS } from "./constants";

const initialState: AppReducer = {
  appName: "siemens",
  activeItemIndex: null,
  selectedCampus: {
    id: -1,
    name: "Tüm Kampüsler",
  },
};

export function appReducer(state = initialState, action: Action): AppReducer {
  switch (action.type) {
    case SET_APP_NAME:
      return {
        ...state,
        appName: action.payload,
      };
    case SET_ACTIVE_ITEM_INDEX:
      return {
        ...state,
        activeItemIndex: action.payload,
      };
    case SET_CAMPUS:
      return {
        ...state,
        selectedCampus: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
