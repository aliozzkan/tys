import React from "react";
import { StyleSheet, Image } from "react-native";
import { Box, Text, Button } from "../components";
import { DoMaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/DoMaintenanceIssueStack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import PDFReader from "rn-pdf-reader-js";

const MaintenanceIssueFile = (
  props: DoMaintenanceIssueStackProps<"DocumentViewer">
) => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1}  position="relative">
      <ReactNativeZoomableView
        maxZoom={10}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        onZoomAfter={() => {}}
        style={{
          padding: 10,
        }}
      >
        {["jpg", "JPG", "jpeg", "JPEG", "png", "PNG"].includes(
          props.route.params.file.path?.split(".").pop() as string
        ) && (
          <PDFReader
            source={{
              uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf",
            }}
          />
        )}
        {(props.route.params.file.path?.split(".").pop() as string) ===
          "pdf" && (
          <PDFReader
            source={{
              uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf",
            }}
          />
        )}
      </ReactNativeZoomableView>
      <Box position="absolute" bottom={insets.bottom + 20} width={"100%"} p="m">
        <Button
          label="Onayla"
          leftIcon="check"
          colorScheme="green"
          variant="bordered"
          onPress={() => {
            props.navigation.navigate({
              name: props.route.params.backUrl,
              params: { [props.route.params.field!]: true },
              merge: true,
            } as any);
          }}
        />
        <Box height={10} />
        <Button
          colorScheme="gray"
          leftIcon="x"
          variant="link"
          label="Vazgeç"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </Box>
    </Box>
  );
};
export default MaintenanceIssueFile;
