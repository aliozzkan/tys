import React, { FC, useState, useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { colors } from "../../theme";
import { FontFamily } from "../../LoadAssets";

interface Props {
  label: string;
  onPress?: () => void;
  checked?: boolean;
}

const RequireAgreementButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={!!props.checked}>
      <Box
        height={50}
        borderColor={props.checked ? "green.500" : "orange.500"}
        backgroundColor={props.checked ? "green.300" : "transparent"}
        borderWidth={1}
        borderRadius="s"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px="m"
        mb="s"
      >
        <FontAwesome
          name={props.checked ? "check" : "hand-pointer-o"}
          size={20}
          color={props.checked ? colors.white : colors.orange["500"]}
        />
        <Text
          color={props.checked ? "white" : "orange.500"}
          variant="body"
          fontFamily={FontFamily.RalewaySemibold}
        >
          {props.label}
        </Text>
        <Box></Box>
      </Box>
    </TouchableOpacity>
  );
};

export default RequireAgreementButton;
