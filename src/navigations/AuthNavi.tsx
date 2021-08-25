import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, LoginScreen } from "../screens";
import { StackNavigationProps } from "./Navigation";

type Routes = {
  Home: undefined;
  Login: undefined;
}

const AuthStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen}  />
    </AuthStack.Navigator>
  );
};

export type AuthNaviProps<RouteName extends keyof Routes> = StackNavigationProps<Routes, RouteName>;

export default AuthenticationNavigator;
