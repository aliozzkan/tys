import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import { DemandDo as Do} from "../../../screens";
import { IDemand } from "../../../models/timeline";

type Routes = {
  DemandDo: {
    data: IDemand["documents"][0]
  }
};

const Stack = createStackNavigator<Routes>();
const DemandDoStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={Do}
      name="DemandDo"
      options={{ title: "Doküman Yükle" }}
    />
    
  </Stack.Navigator>
);

export type DemandDoStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type DemandDoStackNavigationProps = StackNavigationProp<Routes>;

export default DemandDoStack;