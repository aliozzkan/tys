import React, { useRef, useState } from "react";
import { AdvancedListHeader, Box, Text } from "../components";
import FollowDocList from "../components/organisms/FollowDocList";

const FollowDocIssues = (props: any) => {
  const listRef = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
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
        onChangeSearchQuery={(text) => setSearch(text)}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "FollowDocsList",
            filterData: props?.route?.params?.filterData,
            keys: ["userTypes", "completeTypes", "onlyMe"],
          });
        }}
      />
      <FollowDocList
        ref={listRef}
        filterData={props?.route?.params?.filterData as any || {onlyMe: [1]}}
        searchQuery={search}
      />
    </Box>
  );
};

export default FollowDocIssues;
