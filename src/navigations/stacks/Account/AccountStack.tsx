import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import { AccountInfo } from "../../../screens";

type Routes = {
  Info: undefined;
};

const Stack = createStackNavigator<Routes>();
const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen component={AccountInfo} name="Info" options={{ title: "Hesap Bilgileri" }} />
  </Stack.Navigator>
);

export type AccountStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type AccountStackNavigationProps = StackNavigationProp<Routes>;

export default AccountStack;
