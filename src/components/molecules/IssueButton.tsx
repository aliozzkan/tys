import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../";
import { FontFamily } from "../../LoadAssets";
import { Feather } from "@expo/vector-icons";
import { FeatherIcon } from "../../models/icons";
import {RFValue} from 'react-native-responsive-fontsize'

interface Props {
  onPress: () => void;
  disabled?: boolean;
  label: string;
  color: string;
  leftIcon?: FeatherIcon;
  rightIcon?: FeatherIcon;
}

const IssueButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, height: 50 }}
      onPress={props.onPress}
      disabled={!!props.disabled}
    >
      <Box
        flex={1}
        backgroundColor={`${props.color}.400` as any}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
      >
        {!!props.leftIcon && (
          <Box mr="s">
            <Feather name={props.leftIcon} color="white" size={20} />
          </Box>
        )}
        <Text
          color={`${props.color}.50` as any}
          fontSize={RFValue(14)}
          fontFamily={FontFamily.RalewaySemibold}
        >
          {props.label}
        </Text>
        {!!props.rightIcon && (
          <Box ml="s">
            <Feather name={props.rightIcon} color="white" size={20} />
          </Box>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default IssueButton;
