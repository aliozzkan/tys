import React, { FC } from "react";
import { Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthNaviProps } from "../navigations/AuthNavi";
import { Box, Text, Button } from "../components";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeScreen: FC<AuthNaviProps<"Home">> = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <Box style={{ paddingBottom: insets.bottom }}>
      <Box height={hp(60)}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={require("../../assets/images/siemensback.jpg")}
        />
      </Box>
      <Box height={hp(40)} alignItems="stretch">
        <Box alignItems="center" pt="l">
          <Text
            variant="header"
            textTransform="uppercase"
            px="l"
            mt="m"
            color="teal.400"
          >
            Tesis Yönetim
          </Text>
        </Box>
        <Box px="l" pt="l">
          <Button
            label="Giriş Yap"
            size="m"
            colorScheme="teal"
            leftIcon="log-in"
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
