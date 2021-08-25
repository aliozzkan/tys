import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationNavigator, MainNavigator } from "./navigations";
import { useLayoutEffect } from "react";
import { Authenticator } from "./helper/authenticator";
import { useAuth } from "./hooks/redux-hooks";
import ProjectSelect from "./screens/ProjectSelect";

const Root = () => {
  const { isLoggedIn } = useAuth();
  useLayoutEffect(() => {
    Authenticator.Compose();
  }, []);
  return (
    <NavigationContainer independent={true}>
      {isLoggedIn === "unLoginIn" && <AuthenticationNavigator />}
      {isLoggedIn === "noHaveProject" && <ProjectSelect />}
      {isLoggedIn === "loginIn" && <MainNavigator />}
    </NavigationContainer>
  );
};

export default Root;
