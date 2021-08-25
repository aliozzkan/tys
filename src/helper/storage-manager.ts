import AsyncStorage from "@react-native-async-storage/async-storage";
const tokenName = "siemens";

export async function setToken(token: string) {
  await AsyncStorage.setItem(tokenName, token);
}

export async function setUserAndToken(token: string, user: any) {
  await AsyncStorage.setItem(tokenName, JSON.stringify({ token, user }));
}

export async function setAuth(token: string, user: any, project: any) {
  await AsyncStorage.setItem(
    tokenName,
    JSON.stringify({ token, user, project })
  );
}

export async function getToken() {
  return await AsyncStorage.getItem(tokenName);
}

export async function getUserAndToken(): Promise<{
  token: string;
  user: any;
} | null> {
  const item = await AsyncStorage.getItem(tokenName);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export async function getAuthInfo() {
  const item = await AsyncStorage.getItem(tokenName);
  if (item) {
    return JSON.parse(item);
  }
  return undefined;
}

export async function clearToken() {
  return await AsyncStorage.removeItem(tokenName);
}
