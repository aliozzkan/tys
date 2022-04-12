import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { StackNavigationProps } from "../../Navigation";
import {
  MaintenanceIssuesScreen as ListScreen,
  MaintenanceIssueDetailScreen as DetailScreen,
  MaintenanceIssueDo as DoScreen,
  FilterScreen as Filter,
  MaintenanceColorDesc as ColorDesc,
  MaintenanceScanBarcode,
  MaintenanceDetail,
} from "../../../screens";

import DoMaintenanceStack from "./DoMaintenanceIssueStack";
import { Box } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Routes = {
  MaintenanceIssueList: {
    filterData?: any[];
  };
  MaintenanceIssueDetail: {
    maintenanceIssueId: number;
    screenTitle: string;
  };
  Filter: {
    backRoute: "MaintenanceIssueList";
    filterData?: any[];
    keys?: any[];
  };
  ColorDesc: undefined;
  MaintenanceScanBarcode: undefined;
  MaintenanceDetail: {
    barcode: string;
  };
  // MaintenanceIssueDo: {
  //   maintenanceIssueId: number;
  //   screenTitle: string;
  // };
};

const Stack = createStackNavigator();
const MaintenanceIssueStack = () => (
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
      name="MaintenanceIssueList"
      component={ListScreen}
      options={{ title: "Bakım Çizelgesi" }}
    />
    <Stack.Screen
      name="MaintenanceIssueDetail"
      component={DetailScreen}
      options={{ title: "Bakım Detay" }}
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
    <Stack.Screen
      name="MaintenanceScanBarcode"
      component={MaintenanceScanBarcode}
      options={{ title: "Ekipman Barkod" }}
    />
    <Stack.Screen
      name="MaintenanceDetail"
      component={MaintenanceDetail}
      options={{ title: "Ekipman Detay" }}
    />
    {/* <Stack.Screen
      name="MaintenanceIssueDo"
      component={DoMaintenanceStack}
      options={{ title: "Bakım Yap", headerShown: false }}
    /> */}
  </Stack.Navigator>
);

export type MaintenanceIssueStackProps<RouteName extends keyof Routes> =
  StackNavigationProps<Routes, RouteName>;

export type MaintenanceIssueStackNavigationProps = StackNavigationProp<Routes>;

export default MaintenanceIssueStack;
