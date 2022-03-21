import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import { AccountInfo, UpdateInfo, ChangePassword } from "../../../screens";

type Routes = {
  Info: undefined;
  Update: undefined;
  ChangePassword: undefined;
};

const Stack = createStackNavigator<Routes>();
const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={AccountInfo}
      name="Info"
      options={{ title: "Hesap Bilgileri", headerBackTitle: "Geri" }}
    />
    <Stack.Screen
      component={UpdateInfo}
      name="Update"
      options={{ title: "Bilgilerimi Güncelle", headerBackTitle: "Geri" }}
    />
    <Stack.Screen
      component={ChangePassword}
      name="ChangePassword"
      options={{ title: "Şifremi Sıfırla", headerBackTitle: "Geri" }}
    />
  </Stack.Navigator>
);

export type AccountStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type AccountStackNavigationProps = StackNavigationProp<Routes>;

export default AccountStack;
