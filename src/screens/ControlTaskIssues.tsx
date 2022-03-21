import React, { useRef, useState } from "react";
import { AdvancedListHeader, Box } from "../components";
import ControlTaskList from "../components/organisms/ControlTaskList";

const ControlTaskIssues = (props: any) => {
  const listRef = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
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
        onChangeSearchQuery={text => setSearch(text)}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "ControlTaskList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes", "completeTypes", "onlyMe"],
          });
        }}
      />
      <ControlTaskList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any || {onlyMe: [1]}}
        searchQuery={search}
      />
    </Box>
  );
};

export default ControlTaskIssues;
