import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import List from "../../../screens/CounterIssues";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Box } from "../../../components";
import ColorDescScreen from "../../../screens/CounterColorDesc";
import Filter from "../../../screens/Filter";

const Stack = createStackNavigator();
const CounterIssueStack = () => (
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
    <Stack.Screen name="CounterList" options={{title: "Sayaç Çizelgesi"}} component={List} />
    <Stack.Screen
      name="Filter"
      component={Filter}
      options={{ title: "Filtre" }}
    />
    <Stack.Screen
      name="ColorDesc"
      component={ColorDescScreen}
      options={{ title: "Renk Açıklamaları" }}
    />
  </Stack.Navigator>
);

export default CounterIssueStack;
