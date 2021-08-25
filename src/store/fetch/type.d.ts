interface PendingKey {
  type: "KEY_PENDING";
  payload: {
    key: string;
  };
}

interface FulfilledKey {
  type: "KEY_FULFILLED";
  payload: {
    key: string;
    data: any;
  };
}

interface RejectedKey {
  type: "KEY_REJECTED";
  payload: {
    key: string;
    message: string;
  };
}

export type Action = PendingKey | FulfilledKey | RejectedKey;
