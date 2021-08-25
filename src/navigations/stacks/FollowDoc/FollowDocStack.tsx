import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  FollowDocIssues as List,
  FollowDocDetail as Detail,
  FilterScreen as Filter,
  FollowDocColorDesc as ColorDesc,
} from "../../../screens";
import { ILegal } from "../../../models/timeline";
import { Box } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type Routes = {
  FollowDocsList: undefined;
  FollowDocsDetail: {
    data: any;
    screenTitle: string;
  };
  Filter: {
    backRoute: "FollowDocsList";
    filterData?: any[];
    keys?: any[];
  };
  ColorDesc: undefined;
};

const Stack = createStackNavigator<Routes>();
const FollowDocsIssueStack = () => (
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
      name="FollowDocsList"
      options={{ title: "Belge Takip Çizelgesi" }}
    />
    <Stack.Screen
      component={Detail}
      name="FollowDocsDetail"
      options={{ title: "Belgge Takip Çizelgesi" }}
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

export type FollowDocsIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type FollowDocsIssueStackNavigationProps = StackNavigationProp<Routes>;

export default FollowDocsIssueStack;
