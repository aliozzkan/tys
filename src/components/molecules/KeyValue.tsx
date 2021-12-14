import React from "react";
import { Box, Text } from "../";
import { FontFamily } from "../../LoadAssets";

interface KeyValueProps {
  title: string;
  value: string;
  highlight?: boolean;
}

const KeyValue = (props: KeyValueProps) => {
  return (
    <Box mt="s" flexDirection="row" alignItems="center">
      <Text fontSize={12} lineHeight={12} fontFamily={FontFamily.MonserratSemibold}>
        {props.title}:{" "}
      </Text>
      <Text
        fontSize={12}
        lineHeight={12}
        color={props.highlight ? "blue.400" : undefined}
        fontFamily={FontFamily.RalewayRegular}
      >
        {props.value}
      </Text>
    </Box>
  );
};

export default KeyValue;
