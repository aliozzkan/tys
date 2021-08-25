import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  FollowDocDo as Do,
  FollowDocUpload as Upload
} from "../../../screens";
import { IFollowDoc } from "../../../models/timeline";

type Routes = {
  FollowDocDo: {
    data: IFollowDoc;
  };
  FollowDocUpload: {
    data: IFollowDoc;
  };
};

const Stack = createStackNavigator<Routes>();
const FollowDocsIssueStack = () => (
  <Stack.Navigator screenOptions={{ headerBackTitle: "Geri" }}>
    <Stack.Screen
      component={Do}
      name="FollowDocDo"
      options={{ title: "Belge Takip Çizelgesi" }}
    />
    <Stack.Screen
      component={Upload}
      name="FollowDocUpload"
      options={{ title: "Belgge Takip Çizelgesi" }}
    />
  </Stack.Navigator>
);

export type FollowDocsIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type FollowDocsIssueStackNavigationProps = StackNavigationProp<Routes>;

export default FollowDocsIssueStack;
