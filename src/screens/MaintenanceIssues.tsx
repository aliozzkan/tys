import React, { FC, useRef } from "react";
import { Box, AdvancedListHeader } from "../components";
import MaintenanceIssueList from "../components/organisms/MaintenanceIssueList";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";

const MaintenanceIssues: FC<
  MaintenanceIssueStackProps<"MaintenanceIssueList">
> = (props) => {
  const listRef = useRef<any>(null);
  props.navigation.addListener("focus", () => {
    listRef.current.onRefresh();
  });
  return (
    <Box flex={1}>
      <AdvancedListHeader
        onPressGoCritic={() => {
          listRef.current.goUndone();
        }}
        onPressGoToday={() => {
          listRef.current.goToday();
        }}
        onPressColorDesc={() => {
          props.navigation.navigate("ColorDesc");
        }}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "MaintenanceIssueList",
            filterData: props?.route?.params?.filterData,
            keys: [
              "maintenanceTypes",
              "maintenanceStatus",
              "userTypes",
              "periods",
              "completeTypes"
            ],
          });
        }}
      />
      <MaintenanceIssueList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
      />
    </Box>
  );
};

export default MaintenanceIssues;
