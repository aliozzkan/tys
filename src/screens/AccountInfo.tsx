import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Card, Text, Button } from "../components";
import { useAuth } from "../hooks/redux-hooks";
import { Authenticator } from "../helper/authenticator";

const AccountInfo = () => {
  const { user, role, project } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1} alignItems="center" justifyContent="space-between">
      <Box alignItems="center">
        <Box
          mt="m"
          borderRadius="full"
          backgroundColor="white"
          width={hp(14)}
          height={hp(14)}
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name="person" size={hp(10)} />
        </Box>
        <Box alignItems="center" mt="m">
          <Text variant="header">
            {user.name} {user.surname}
          </Text>
          <Box flexDirection="row">
            <Box
              backgroundColor={
                role === 1 ? "blue.100" : role === 2 ? "orange.100" : "gray.100"
              }
              p="s"
              px="l"
              borderRadius="s"
            >
              <Text variant="body">
                {role === 1 ? "Admin" : role === 2 ? "Yönetici" : "Standart"}
              </Text>
            </Box>
            <Box height={30} backgroundColor="gray.400" width={2} mx="l"></Box>
            <Box mt="s">
              <Text variant="bodyHeader">{project.name}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box style={{ marginBottom: insets.bottom + 30, width: "80%" }}>
        <Button
          onPress={Authenticator.Logout}
          colorScheme="red"
          variant="bordered"
          label="Çıkış Yap"
        />
      </Box>
    </Box>
  );
};

export default AccountInfo;
