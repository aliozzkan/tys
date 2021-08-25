import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import { ControlTaskDo as Do } from "../../../screens";
import { IControlTask } from "../../../models/timeline";

type Routes = {
  ControlTaskDo: {
    data: IControlTask;
  };
};

const Stack = createStackNavigator<Routes>();
const ControlTaskIssueStack = () => (
  <Stack.Navigator screenOptions={{ headerBackTitle: "Geri" }}>
    <Stack.Screen component={Do} name="ControlTaskDo" options={{ title: "Denetim Gerçekleştir" }} />
  </Stack.Navigator>
);

export type ControlTaskIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type ControlTaskIssueStackNavigationProps = StackNavigationProp<Routes>;

export default ControlTaskIssueStack;
