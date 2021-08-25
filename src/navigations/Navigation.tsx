import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface BottomTabNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: BottomTabNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}
