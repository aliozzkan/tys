import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { AdvancedListHeader, Box } from "../components";
import CounterList from "../components/organisms/CounterList";

const CounterIssuesScreen = (props: any) => {
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
        onChangeSearchQuery={(text) => setSearch(text)}
        onPressFilter={() => {
          props.navigation.navigate("Filter", {
            backRoute: "CounterList",
            filterData: props?.route?.params?.filterData,
            keys: ["completeTypes", "counterTypes"],
          });
        }}
        noCampus
      />
      <CounterList
        ref={listRef}
        filterData={(props?.route?.params?.filterData as any) || {}}
        searchQuery={search}
      />
    </Box>
  );
};

export default CounterIssuesScreen;
