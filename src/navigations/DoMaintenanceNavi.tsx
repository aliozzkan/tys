import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LegalIssuesScreen } from "../screens";
import { BottomTabNavigationProps } from "./Navigation";
import { Text } from "../components";
import { Feather } from "@expo/vector-icons";
import { FontFamily } from "../LoadAssets";
import { colors } from "../theme";
import { FeatherIcon } from "../models/icons";

import { MaintenanceIssueStack } from "./stacks";
import LegalIssueStack from "./stacks/LegalIssue/LegalIssueStack";
import DemandIssueStack from "./stacks/DemandIssue/DemandIssueStack";
import FollowDocIssueStack from "./stacks/FollowDoc/FollowDocStack";
import ControlTaskIssueStack from "./stacks/ControlTask/ControlTaskIssueStack";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type Routes = {
  MaintenanceIssueStack: undefined;
  LegalIssueStack: undefined;
};

function createLabel(label: string) {
  return ({ focused }: any) => (
    <Text
      color={focused ? "teal.500" : "gray.500"}
      fontFamily={FontFamily.RalewayRegular}
      fontSize={12}
    >
      {label}
    </Text>
  );
}

function createIcon(icon: any) {
  return ({ focused }: any) => (
    <MaterialCommunityIcons
      name={icon}
      size={20}
      color={focused ? colors.teal["500"] : colors.gray["500"]}
    />
  );
}

const DoMaintenanceTabs = createBottomTabNavigator();
const DoMaintenanceNavi = () => {
  return (
    <DoMaintenanceTabs.Navigator>
      <DoMaintenanceTabs.Screen
        name="ControlTaskIssueStack"
        component={ControlTaskIssueStack}
        options={{
          tabBarIcon: createIcon("format-list-checkbox"),
          tabBarLabel: createLabel("Denetim"),
        }}
      />
      <DoMaintenanceTabs.Screen
        name="DemandIssueStack"
        component={DemandIssueStack}
        options={{
          tabBarIcon: createIcon("calendar-check"),
          tabBarLabel: createLabel("Talep"),
        }}
      />
      <DoMaintenanceTabs.Screen
        name="FollowDocIssueStack"
        component={FollowDocIssueStack}
        options={{
          tabBarIcon: createIcon("view-list-outline"),
          tabBarLabel: createLabel("Belge"),
        }}
      />

      <DoMaintenanceTabs.Screen
        name="MaintenanceIssueStack"
        component={MaintenanceIssueStack}
        options={{
          tabBarIcon: createIcon("calendar-blank-outline"),
          tabBarLabel: createLabel("Bakım"),
        }}
      />
      <DoMaintenanceTabs.Screen
        name="LegalIssueStack"
        component={LegalIssueStack}
        options={{
          tabBarIcon: createIcon("view-comfy"),
          tabBarLabel: createLabel("Periyodik"),
        }}
      />
    </DoMaintenanceTabs.Navigator>
  );
};

export type DoMaintenanceNavigatorProps<RouteName extends keyof Routes> =
  BottomTabNavigationProps<Routes, RouteName>;

export default DoMaintenanceNavi;
