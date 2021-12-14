import React, { useLayoutEffect, useRef, useState } from "react";
import { AdvancedListHeader, Box } from "../components";
import DemandIssueList from "../components/organisms/DemandIssueList";

const DemandIssues = (props: any) => {
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
        onChangeSearchQuery={(text) => setSearch(text)}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "DemandIssueList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes", "demandGroup", "completeTypes", "onlyMe"],
          });
        }}
      />
      <DemandIssueList
        ref={listRef}
        filterData={
          (props?.route?.params?.filterData as any) || { onlyMe: [1] }
        }
        searchQuery={search}
      />
    </Box>
  );
};

export default DemandIssues;
