import { FulfilledKey, PendingKey, RejectedKey } from "./type";

export function fulfilledKey(key: string, data: any): FulfilledKey {
  return {
    type: "KEY_FULFILLED",
    payload: {
      key,
      data,
    },
  };
}

export function rejectedKey(key: string, message: string): RejectedKey {
  return {
    type: "KEY_REJECTED",
    payload: {
      key,
      message,
    },
  };
}

export function pendingKey(key: string): PendingKey {
  return {
    type: "KEY_PENDING",
    payload: {
      key,
    },
  };
}
