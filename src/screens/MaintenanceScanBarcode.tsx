import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Button } from "../components";
import { useBarcodePermission } from "../hooks/barcode-permission";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";

const MaintenanceScanBarcode: FC<
  MaintenanceIssueStackProps<"MaintenanceScanBarcode">
> = (props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const barcodePermission = useBarcodePermission();
  const barcodeRef = useRef<any>(null);
  const [hasScanned, setHasScanned] = useState<any>(null);

  useEffect(() => {
    if (!!hasScanned) {
      props.navigation.navigate("MaintenanceDetail", {
        barcode: hasScanned.data,
      });
    }
  }, [hasScanned]);
  return (
    <Box
      style={{ paddingTop: safeAreaInsets.top }}
      position="relative"
      flex={1}
    >
      <Box
        position="absolute"
        top={safeAreaInsets.top + 20}
        right={safeAreaInsets.right + 20}
        height={100}
        width={100}
        zIndex={"3xl"}
      >
        <Button
          label="Kapat"
          colorScheme="red"
          size="s"
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
      </Box>
      <Box
        height={hp("25%")}
        width={"90%"}
        left="5%"
        position="absolute"
        zIndex="xl"
        top="40%"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box
          height={hp("12%")}
          width={"40%"}
          borderTopWidth={1}
          borderLeftWidth={1}
          borderColor={!!hasScanned ? "green.200" : "red.100"}
        ></Box>
        <Box
          height={hp("12%")}
          width={"40%"}
          borderTopWidth={1}
          borderRightWidth={1}
          borderColor={!!hasScanned ? "green.200" : "red.100"}
        ></Box>
        <Box
          height={hp("12%")}
          mt="l"
          width={"40%"}
          borderBottomWidth={1}
          borderLeftWidth={1}
          borderColor={!!hasScanned ? "green.200" : "red.100"}
        ></Box>
        <Box
          height={hp("12%")}
          width={"40%"}
          mt="l"
          borderBottomWidth={1}
          borderRightWidth={1}
          borderColor={!!hasScanned ? "green.200" : "red.100"}
        ></Box>
      </Box>
      {barcodePermission.hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            setHasScanned({ type, data });
          }}
          ref={barcodeRef}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      )}
    </Box>
  );
};

export default MaintenanceScanBarcode;
