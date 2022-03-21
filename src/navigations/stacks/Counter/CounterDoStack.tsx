import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import { CounterTaskDo as Do } from "../../../screens";
import { IControlTask, ICounter } from "../../../models/timeline";

type Routes = {
  CounterTaskDo: {
    data: ICounter;
  };
};

const Stack = createStackNavigator<Routes>();
const CounterDoStack = () => (
  <Stack.Navigator screenOptions={{ headerBackTitle: "Geri" }}>
    <Stack.Screen
      component={Do}
      name="CounterTaskDo"
      options={{ title: "Sayaç Kontrolü Gerçekleştir" }}
    />
  </Stack.Navigator>
);

export type CounterIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type CounterIssueStackNavigationProps = StackNavigationProp<Routes>;

export default CounterDoStack;
