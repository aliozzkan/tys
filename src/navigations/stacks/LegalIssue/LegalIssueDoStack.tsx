import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  LegalIssueDo as Do,
  LegalIssueUpdate as Update,
  MaintenanceIssueBarcode as Barcode,
} from "../../../screens";
import FileViewerScreen from "../../../screens/MaintenanceIssueFile";
import { ILegal } from "../../../models/timeline";

type Routes = {
  DoLegalIssue: {
    data: ILegal;
    barcode?: string;
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
  Update: {
    data: ILegal;
  };
};

const Stack = createStackNavigator<Routes>();
const LegalIssueDo = () => (
  <Stack.Navigator mode="modal" initialRouteName="DoLegalIssue">
    <Stack.Screen component={Do} name="DoLegalIssue" />
    <Stack.Screen component={FileViewerScreen} name="DocumentViewer" />
    <Stack.Screen component={Update} name="Update" options={{title: "Form Yükle"}} />
    <Stack.Screen
      component={Barcode}
      name="Barcode"
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export type DoLegalIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type DoLegalIssueStackNavigationProps = StackNavigationProp<Routes>;

export default LegalIssueDo;
