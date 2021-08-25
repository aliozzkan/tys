import { Box } from "../";
import React, { FC } from "react";
import { FlatList, RefreshControl } from "react-native";
import { spacing } from "../../theme";

interface Props {
  onRefresh: () => void;
  refreshing: boolean;
  ItemComponent: any;
  data: any[];
  noRefresh?: boolean;
  scrollRef?: any;
}

const IssueFlatList: FC<Props> = (props) => {
  return (
    <FlatList
      ref={props.scrollRef}
      ItemSeparatorComponent={() => <Box my="s" />}
      contentContainerStyle={{ padding: spacing.m }}
      data={props.data || null}
      renderItem={({ item }) => <props.ItemComponent data={item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      initialNumToRender={props.data?.length || 10}
      onScrollToIndexFailed={(info) => {
        console.log(info)
      }}
      refreshControl={
        !!props.noRefresh ? undefined : (
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        )
      }
    />
  );
};

export default IssueFlatList;
