import React, { useRef } from "react";
import { AdvancedListHeader, Box, Text } from "../components";
import FollowDocList from "../components/organisms/FollowDocList";

const FollowDocIssues = (props: any) => {
  const listRef = useRef<any>(null);
  props.navigation.addListener("focus", () => {
    listRef.current.onRefresh();
  });
  return (
    <Box flex={1}>
      <AdvancedListHeader
        onPressColorDesc={() => {
          props.navigation.navigate("ColorDesc");
        }}
        onPressGoCritic={() => {
          listRef.current.goUndone();
        }}
        onPressGoToday={() => {
          listRef.current.goToday();
        }}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "FollowDocsList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes"],
          });
        }}
      />
      <FollowDocList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any}
      />
    </Box>
  );
};

export default FollowDocIssues;
