import React, { useRef } from "react";
import { AdvancedListHeader, Box } from "../components";
import ControlTaskList from "../components/organisms/ControlTaskList";

const ControlTaskIssues = (props: any) => {
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
          props.navigation.navigate("ColorDesc")
        }}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "ControlTaskList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes", "completeTypes"],
          });
        }}
      />
      <ControlTaskList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
      />
    </Box>
  );
};

export default ControlTaskIssues;
