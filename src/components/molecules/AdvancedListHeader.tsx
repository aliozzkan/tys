import React, { FC } from "react";
import { ScrollView } from "react-native";
import { Box, Button } from "../";

type callback = () => void;

interface Props {
  onPressFilter: callback;
  onPressGoToday: callback;
  onPressGoCritic: callback;
  onPressSearch?: callback;
  onPressColorDesc?: callback;
}

const AdvancedListHeader: FC<Props> = (props) => {
  return (
    <Box
      py="m"
      backgroundColor="gray.50"
      borderBottomColor="blackAlpha.100"
      borderBottomWidth={1}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box flexDirection="row" alignItems="center">
          <Button
            leftIcon="arrow-down"
            marginHorizontal="xs"
            marginLeft="m"
            colorScheme="blue"
            label="Geçmiş"
            onPress={props.onPressGoCritic || undefined}
          />
          <Button
            leftIcon="clock"
            marginHorizontal="xs"
            colorScheme="orange"
            label="Bugün"
            onPress={props.onPressGoToday || undefined}
          />
          <Button
            leftIcon="filter"
            marginHorizontal="xs"
            colorScheme="teal"
            iconed
            label=""
            onPress={props.onPressFilter || undefined}
          />
          <Button
            leftIcon="search"
            marginHorizontal="xs"
            colorScheme="red"
            label="Arama Yap"
            iconed
            onPress={props.onPressSearch || undefined}
          />
          {props.onPressColorDesc && (
            <Button
              leftIcon="info"
              marginHorizontal="xs"
              colorScheme="purple"
              iconed
              marginRight="xl"
              label=""
              onPress={props.onPressColorDesc || undefined}
            />
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default AdvancedListHeader;
