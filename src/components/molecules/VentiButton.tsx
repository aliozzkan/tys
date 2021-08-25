import React from "react";
import { TouchableOpacity } from "react-native";
import { AspectRatio, Box, Text } from "../";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme";
import { FontFamily } from "../../LoadAssets";

const VentiButton = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <AspectRatio ratio={1}>
        <Box
          backgroundColor="red.100"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="xl"
          py="l"
        >
          <Box></Box>
          <Box>
            <Feather name="file" size={40} color={colors.red["800"]} />
          </Box>
          <Box justifyContent="center">
            <Text
              fontFamily={FontFamily.RalewayBold}
              color={"red.800"}
              fontWeight="bold"
            >
              Ekipman İşlemleri
            </Text>
          </Box>
        </Box>
      </AspectRatio>
    </TouchableOpacity>
  );
};

export default VentiButton;
