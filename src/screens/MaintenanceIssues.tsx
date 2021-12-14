import React, { FC, useRef, useState } from "react";
import { Box, AdvancedListHeader } from "../components";
import MaintenanceIssueList from "../components/organisms/MaintenanceIssueList";
import { useRedux } from "../hooks/redux-hooks";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";

const MaintenanceIssues: FC<
  MaintenanceIssueStackProps<"MaintenanceIssueList">
> = (props) => {
  const listRef = useRef<any>(null);
  props.navigation.addListener("focus", () => {
    listRef.current.onRefresh();
  });
  const [search, setSearch] = useState<string>("");
  const [
    {
      app: { selectedCampus },
    },
  ] = useRedux();
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
        onChangeSearchQuery={(text) => setSearch(text)}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "MaintenanceIssueList",
            filterData: props?.route?.params?.filterData,
            keys: [
              "maintenanceTypes",
              "maintenanceStatus",
              "userTypes",
              "periods",
              "completeTypes",
            ],
          });
        }}
      />
      <MaintenanceIssueList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
        searchQuery={search}
      />
    </Box>
  );
};

export default MaintenanceIssues;
