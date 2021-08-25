import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  DemandIssues as List,
  DemandDocs as Docs,
  FilterScreen as Filter,
  DemandColorDesc as ColorDesc,
} from "../../../screens";
import { IDemand } from "../../../models/timeline";
import { Box } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type Routes = {
  DemandIssueList: undefined;
  Docs: {
    demand: IDemand;
  };
  Filter: {
    backRoute: "DemandIssueList";
    filterData?: any[];
    keys?: any[];
  };
};

const Stack = createStackNavigator<Routes>();
const DemandIssueStack = () => (
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
      name="DemandIssueList"
      options={{ title: "Talep Çizelgesi" }}
    />
    <Stack.Screen
      component={Docs}
      name="Docs"
      options={{ title: "Talep Dokümanları" }}
    />
    <Stack.Screen
      name="Filter"
      component={Filter}
      options={{ title: "Filtre" }}
    />
  </Stack.Navigator>
);

export type DemandIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type DemandIssueStackNavigationProps = StackNavigationProp<Routes>;

export default DemandIssueStack;
