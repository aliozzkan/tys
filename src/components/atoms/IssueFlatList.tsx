import React, { FC } from "react";
import { FlatList, RefreshControl } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { spacing } from "../../theme";
import { Box } from "../";

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
      ItemSeparatorComponent={() => (
        <Box my="zero" style={{ marginBottom: 16 }} />
      )}
      contentContainerStyle={{ padding: spacing.m }}
      data={props.data || null}
      renderItem={({ item, index }) => (
        <props.ItemComponent data={item} index={index} />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      initialNumToRender={10}
      getItemLayout={(_, index) => ({
        index: index,
        length: 350,
        offset: index * (RFValue(300) + 16),
      })}
      onScrollToIndexFailed={(info) => {
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
