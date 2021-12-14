import React, { useRef, useState } from "react";
import { AdvancedListHeader, Box } from "../components";
import LegalIssueList from "../components/organisms/LegalIssueList";

const LegalIssues = (props: any) => {
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
            backRoute: "LegalIssueList",
            filterData: props?.route?.params?.filterData,
            keys: ["legalStatus", "userTypes", "completeTypes"],
          });
        }}
      />
      <LegalIssueList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
        searchQuery={search}
      />
    </Box>
  );
};

export default LegalIssues;
