import { store } from "../store";
import * as storageManager from "./storage-manager";
import {
  clearAuth,
  setAuth,
  setAuthWithProject,
  setProject,
} from "../store/auth/actions";

export const Authenticator = {
  Login: async (token: string, user: any, decoded: any = null) => {
    await storageManager.setUserAndToken(token, user);
    store.dispatch(setAuth({ decoded, jwt: token, user: user }));
  },
  SetProject: async (token: any, user: any, project: any) => {
    await storageManager.setAuth(token, user, project);
    store.dispatch(setProject(project));
  },
  LoginWithProject: async (
    token: any,
    user: any,
    project: any,
    decoded: any = null
  ) => {
    await storageManager.setAuth(token, user, project);
    store.dispatch(setAuthWithProject({ decoded, jwt: token, project, user }));
  },
  Logout: async () => {
    await storageManager.clearToken();
    store.dispatch(clearAuth());
  },
  Compose: async () => {
    const data = await storageManager.getAuthInfo();

    if (!data) return store.dispatch(clearAuth());

    if (!!!data.token || !!!data.user) return store.dispatch(clearAuth());

    if (!!data.project) {
      return store.dispatch(
        setAuthWithProject({
          decoded: null,
          jwt: data.token,
          project: data.project,
          user: data.user,
        })
      );
    }

    return store.dispatch(
      setAuth({ decoded: null, jwt: data.token, user: data.user })
    );
  },
  GetAuthInfo: () => {
    return {
      isLoggedIn: store.getState().auth.isLoggedIn,
      user: store.getState().auth.user,
      project: store.getState().auth.project,
      token: store.getState().auth.jwt,
    };
  },
};
