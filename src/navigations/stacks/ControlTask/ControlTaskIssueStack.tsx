import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  ControlTaskIssues as List,
  FilterScreen as Filter,
  ControlTaskDesc as ColorDesc,
} from "../../../screens";
import { IDemand } from "../../../models/timeline";
import { Box } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type Routes = {
  ControlTaskList: {
    filterData?: any[];
  };
  Filter: {
    backRoute: "ControlTaskList";
    filterData?: any[];
    keys?: any[];
  };
  ColorDesc: undefined;
};

const Stack = createStackNavigator<Routes>();
const ControlTaskIssueStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitle: "Geri",
      headerRight: (props) => {
        const navigation = useNavigation<any>();
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountStack");
            }}
          >
            <Box pr="m">
              <Ionicons name="person-circle" size={24} />
            </Box>
          </TouchableOpacity>
        );
      },
    }}
  >
    <Stack.Screen
      component={List}
      name="ControlTaskList"
      options={{ title: "Denetim Çizelgesi" }}
    />
    <Stack.Screen
      name="Filter"
      component={Filter}
      options={{ title: "Filtre" }}
    />
    <Stack.Screen
      name="ColorDesc"
      component={ColorDesc}
      options={{ title: "Renk Açıklamaları" }}
    />
  </Stack.Navigator>
);

export type ControlTaskStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type ControlTaskStackNavigationProps = StackNavigationProp<Routes>;

export default ControlTaskIssueStack;
