import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  LegalIssuesScreen as List,
  LegalIssueDetail as Detail,
  FilterScreen as Filter,
  LegalColorDesc as ColorDesc,
} from "../../../screens";
import { ILegal } from "../../../models/timeline";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {Box} from '../../../components'

type Routes = {
  LegalIssueList: undefined;
  LegalIssueDetail: {
    data: ILegal;
    screenTitle: string;
  };
  Filter: {
    backRoute: "LegalIssueList";
    filterData?: any[];
    keys?: any[];
  };
  ColorDesc: undefined;
};

const Stack = createStackNavigator<Routes>();
const LegalIssueStack = () => (
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
      name="LegalIssueList"
      options={{ title: "Periyodik Kontrol Çizelgesi" }}
    />
    <Stack.Screen
      component={Detail}
      name="LegalIssueDetail"
      options={{ title: "Periyodik Kontrol Çizelgesi" }}
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

export type LegalIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type LegalIssueStackNavigationProps = StackNavigationProp<Routes>;

export default LegalIssueStack;
