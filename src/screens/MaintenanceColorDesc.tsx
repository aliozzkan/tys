import React, { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Box, ColorItem } from "../components";
import { Hooks } from "../services";

const MaintenanceColorDesc = () => {
  const colorManager = Hooks.MaintenanceDescription();

  useLayoutEffect(() => {
    colorManager.fetch();
  }, []);

  if (!colorManager.isFullfilled) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        data={colorManager.data?.data.data!}
        keyExtractor={(item) => item.statusCode.toString()}
        renderItem={({ item }) => (
          <ColorItem
            {...{
              code: item.statusCode,
              color: item.statusColor,
              desc: item.statusDesc,
            }}
          />
        )}
      />
    </Box>
  );
};

export default MaintenanceColorDesc;
