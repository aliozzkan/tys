import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  MaintenanceIssueDo as DoScreen,
  MaintenanceIssueBarcode as Barcode,
  MaintenanceIssueFile as File,
} from "../../../screens";

type Routes = {
  DoMaintenanceIssue: {
    maintenanceIssueId: number;
    screenTitle: string;
    barcode?: string;
    requires?: any;
  };
  Barcode: {
    maintenanceIssueId: number;
    screenTitle: string;
    backUrl: string;
  };
  DocumentViewer: {
    file: {
      path: string;
      type: string;
    };
    backUrl: string;
    field?: string;
  };
};

const Stack = createStackNavigator();
const DoMaintenanceIssueStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitle: "Geri",
    }}
    mode="modal"
    initialRouteName="DoMaintenanceIssue"
  >
    <Stack.Screen component={DoScreen} name="DoMaintenanceIssue" />
    <Stack.Screen
      component={Barcode}
      name="Barcode"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={File}
      name="DocumentViewer"
      options={{ headerShown: false }}
    />
   
  </Stack.Navigator>
);

export type DoMaintenanceIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type DoMaintenanceIssueStackNavigationProps =
  StackNavigationProp<Routes>;

export default DoMaintenanceIssueStack;
