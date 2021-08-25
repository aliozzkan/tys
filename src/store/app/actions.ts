import { SetAppName } from "./types";
import * as constants from "./constants";

export function setAppName(appName: string): SetAppName {
  return {
    type: constants.SET_APP_NAME,
    payload: appName,
  };
}

export function setActiveItemIndex(index: number) {
  return {
    type: constants.SET_ACTIVE_ITEM_INDEX,
    payload: index,
  };
}
