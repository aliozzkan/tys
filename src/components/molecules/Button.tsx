import React, { ReactElement } from "react";
import { TouchableHighlight, ActivityIndicator } from "react-native";
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";

import {
  colors,
  responsiveSizes,
  Theme,
  spacing as spacingValues,
} from "../../theme";

import Text from "../atoms/Text";
import Box from "../atoms/Box";
import { FontFamily } from "../../LoadAssets";
import { FeatherIcon } from "../../models/icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

type variant = "bordered" | "solid" | "link";
type size = "s" | "m" | "l";

const restyleFunctions = [spacing, border, backgroundColor];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    onLongPress: () => void;
    label: string;
    colorScheme: keyof typeof colors;
    variant: variant;
    size: size;
    leftIcon?: FeatherIcon;
    isLoading?: boolean;
    disabled?: boolean;
    isBlock?: boolean;
    iconed?: boolean;
  };

const Button = ({
  onPress,
  onLongPress,
  variant,
  size,
  label,
  colorScheme,
  leftIcon,
  isLoading,
  disabled,
  isBlock,
  iconed,
  ...rest
}: Props) => {
  const variantProps = {
    bordered: {
      backgroundColor: "transparent",
      borderColor: `${colorScheme || "gray"}.400`,
    },
    solid: {
      backgroundColor: `${colorScheme || "gray"}.400`,
      borderColor: `${colorScheme || "gray"}.400`,
    },
    link: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
  };

  const props = useRestyle(restyleFunctions, {
    ...variantProps[variant],
    borderWidth: 2,
    borderRadius: size === "m" ? "m" : size === "l" ? "l" : "s",
    padding: size === "m" ? "s" : size === "l" ? "m" : "xs",
    ...rest,
  });
  return (
    <TouchableHighlight
      {...props}
      onPress={onPress}
      onLongPress={onLongPress}
      underlayColor={colors[colorScheme]["500"]}
      disabled={!!isLoading || !!disabled}
    >
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        width={!!isBlock ? "100%" : "auto"}
        style={{ padding: heightPercentageToDP(0.3) }}
      >
        {!!leftIcon && (
          <Feather
            name={leftIcon}
            size={
              size === "m"
                ? responsiveSizes.l
                : size === "l"
                ? responsiveSizes.xl
                : responsiveSizes.s
            }
            color={colors[colorScheme][variant === "solid" ? "50" : "400"]}
          />
        )}
        {!!isLoading ? (
          <Box p="xs">
            <ActivityIndicator
              color={colors[colorScheme][variant === "solid" ? "50" : "400"]}
            />
          </Box>
        ) : !!iconed ? null : (
          <Text
            ml={!!leftIcon ? "s" : "zero"}
            color={
              `${colorScheme || "gray"}.${
                variant === "solid" ? "50" : "400"
              }` as any
            }
            fontFamily={FontFamily.RalewaySemibold}
            fontSize={
              size === "m"
                ? responsiveSizes.m
                : size === "l"
                ? responsiveSizes.l
                : responsiveSizes.s
            }
            lineHeight={
              size === "m"
                ? responsiveSizes.l
                : size === "l"
                ? responsiveSizes.xl
                : responsiveSizes.m
            }
          >
            {label}
          </Text>
        )}
      </Box>
    </TouchableHighlight>
  );
};

Button.defaultProps = {
  colorScheme: "gray",
  variant: "solid",
  label: "Button",
  onPress: () => {},
  onLongPress: () => {},
  size: "m",
};

export default Button;
