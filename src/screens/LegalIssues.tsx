import React, { useRef } from "react";
import { AdvancedListHeader, Box } from "../components";
import LegalIssueList from "../components/organisms/LegalIssueList";

const LegalIssues = (props: any) => {
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
            backRoute: "LegalIssueList",
            filterData: props?.route?.params?.filterData,
            keys: ["legalStatus", "userTypes", "completeTypes"],
          });
        }}
      />
      <LegalIssueList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
      />
    </Box>
  );
};

export default LegalIssues;
