import React, { useEffect, useState } from "react";
import LoadAssets from "./src/LoadAssets";
import { Provider as ThemeProvider } from "./src/theme";
import Root from "./src/Root";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Moment from "moment";
import { StatusBar } from "expo-status-bar";
import "react-native-url-polyfill/auto";
import "moment/locale/tr";
import { Box, Text } from "./src/components";
import { ActivityIndicator } from "react-native";
import { Hooks } from "./src/services";

export default function App() {
  const versionManager = Hooks.VersionControl();
  const [versionCheck, setVersionCheck] = useState<"ok" | "not" | null>(null);

  useEffect(() => {
    Moment.locale("tr");
    versionManager.fetch(10);
  }, []);

  useEffect(() => {
    if (versionManager.isFullfilled) {
      setVersionCheck(versionManager.data?.data.success ? "ok" : "not");
    }
  }, [versionManager.status]);

  return (
    <LoadAssets>
      <Provider {...{ store }}>
        <ThemeProvider>
          {versionCheck === "ok" && <Root />}
          {versionCheck === "not" && (
            <Box flex={1} justifyContent="center" backgroundColor="gray.100" alignItems="center">
              <Box alignItems="center" backgroundColor="white" padding="xl" borderRadius="m" borderWidth={1} borderColor="gray.200">
                <Text>Güncelleme Gerekli</Text>
                <Text fontSize={12} marginTop="s">Lütfen uygulamayı marketten güncelleyin!</Text>
              </Box>
            </Box>
          )}
          {versionCheck === null && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator />
            </Box>
          )}
        </ThemeProvider>
        <StatusBar style="dark" />
      </Provider>
    </LoadAssets>
  );
}
