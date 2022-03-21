import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProps } from "./Navigation";

import TimelineTabs from "./DoMaintenanceNavi";
import DoMaintenanceIssueStack from "./stacks/MaintenanceIssueStack/DoMaintenanceIssueStack";
import DoLegalIssueStack from './stacks/LegalIssue/LegalIssueDoStack'
import DoDemandIssueStack from './stacks/DemandIssue/DemandIssueDo'
import DoFollowDocIssueStack from './stacks/FollowDoc/FollowDocDoStack'
import DoControlTaskIssueStack from './stacks/ControlTask/ControlTaskDoStack'
import DoCounterIssueStack from './stacks/Counter/CounterDoStack'
import AccountStack from './stacks/Account/AccountStack'

type Routes = {
  Dasboard: undefined;
  MaintenanceIssueDo: {
    maintenanceIssueId: number;
    screenTitle: string;
  };
  DoLegalIssueStack: undefined;
  DoDemandIssueStack: undefined;
  AccountStack: undefined;
};

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen
        name="Timeline"
        component={TimelineTabs}
        options={{title: "Çizelge"}}
      />
      <MainStack.Screen
        name="MaintenanceIssueDo"
        component={DoMaintenanceIssueStack}
      />
      <MainStack.Screen
        name="DoLegalIssueStack"
        component={DoLegalIssueStack}
      />
      <MainStack.Screen
        name="DoDemandIssueStack"
        component={DoDemandIssueStack}
      />
      <MainStack.Screen
        name="DoFollowDocIssueStack"
        component={DoFollowDocIssueStack}
      />
      <MainStack.Screen
        name="DoControlTaskIssueStack"
        component={DoControlTaskIssueStack}
      />
      <MainStack.Screen
        name="DoCounterIssueStack"
        component={DoCounterIssueStack}
      />
      <MainStack.Screen
        name="AccountStack"
        component={AccountStack}
      />
    </MainStack.Navigator>
  );
};

export type AuthNaviProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export default MainNavigator;
