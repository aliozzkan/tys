import React from "react";
import { ScrollView } from "react-native";
import { Box, Text, AspectRatio, VentiButton } from "../components";
import { spacing } from "../theme";

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: spacing.m }}>
      <Box flexDirection="row"></Box>
    </ScrollView>
  );
};

export default Dashboard;
