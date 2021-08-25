import React, { useLayoutEffect, useRef } from "react";
import { AdvancedListHeader, Box } from "../components";
import DemandIssueList from "../components/organisms/DemandIssueList";

const DemandIssues = (props: any) => {
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
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "DemandIssueList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes"],
          });
        }}
      />
      <DemandIssueList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
      />
    </Box>
  );
};

export default DemandIssues;
