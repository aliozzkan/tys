import { useState } from "react";
import { useRedux } from "./redux-hooks";
import { fulfilledKey, pendingKey, rejectedKey } from "../store/fetch/actions";
import { AxiosResponse } from "axios";

type Status = "fulfilled" | "rejected" | "pending" | null;
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

interface ResponseContainer<T> {
  data: T;
  success: boolean;
  message: string;
}

export function useFetchManager<T extends (...args: any) => any, D = any>(
  func: T
): {
  fetch: (...params: Parameters<T>) => Promise<ThenArg<ReturnType<T>>>;
  isFullfilled: boolean;
  isRejected: boolean;
  isPending: boolean;
  hasData: boolean;
  data: ThenArg<AxiosResponse<ResponseContainer<D>>> | null;
  onReset: () => void;
  status: Status;
} {
  const [data, setData] = useState<ThenArg<ReturnType<T>> | null>(null);
  const [status, setStatus] = useState<Status>(null);

  async function processAsync(
    ...params: Parameters<T>
  ): Promise<ThenArg<ReturnType<T>>> {
    setStatus("pending");
    try {
      const data = await func(...(params as any));
      setData(data);
      setStatus("fulfilled");
      return data;
    } catch (error) {
      console.log(error);
      setStatus("rejected");
      return error;
    }
  }

  async function reset() {
    setData(null);
    setStatus(null);
  }

  return {
    data,
    onReset: reset,
    fetch: processAsync,
    status,
    hasData: !!data,
    isFullfilled: status === "fulfilled",
    isPending: status === "pending",
    isRejected: status === "rejected",
  };
}

export function useFetchManagerStore<T extends (...args: any) => any, D = any>(
  func: T,
  storeKey: string
): {
  fetch: (...params: Parameters<T>) => void;
  isFullfilled: boolean;
  isRejected: boolean;
  isPending: boolean;
  hasData: boolean;
  data: ThenArg<AxiosResponse<ResponseContainer<D>>> | null;
  status: Status;
} {
  const [store, dispatch] = useRedux();

  async function processAsyncStore(...params: Parameters<T>) {
    dispatch(pendingKey(storeKey));
    try {
      const data = await func(...(params as any));
      dispatch(fulfilledKey(storeKey, data));
    } catch (error) {
      dispatch(rejectedKey(storeKey, "Hata"));
    }
  }

  return {
    data: store.fetch[storeKey]?.data,
    fetch: processAsyncStore,
    status: store.fetch[storeKey]?.status,
    hasData: !!store.fetch[storeKey]?.data,
    isFullfilled: store.fetch[storeKey]?.status === "fulfilled",
    isPending: store.fetch[storeKey]?.status === "pending",
    isRejected: store.fetch[storeKey]?.status === "rejected",
  };
}
