import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import React, { FC, useLayoutEffect, useEffect } from "react";
import { ActivityIndicator, ScrollView, Alert, Image } from "react-native";
import { Box, KeyValue, Text, Button } from "../components";
import LegalIssueMaker from "../components/organisms/LegalIssueMaker";
import { DoLegalIssueStackProps } from "../navigations/stacks/LegalIssue/LegalIssueDoStack";

const LegalIssueDo: FC<DoLegalIssueStackProps<"DoLegalIssue">> = (props) => {

  useEffect(() => {
    if (
      props.route.params.barcode !== undefined &&
      props.route.params.barcode !== props.route.params.data.barcode
    ) {
      Alert.alert(
        "Hatalı Barkod!",
        "Taratılan barkod bakım yapılmak istenilen ekipman ile uyuşmuyor.",
        [
          {
            text: "Tamam",
            onPress: () => {
              props.navigation.setParams({ barcode: undefined });
            },
          },
        ]
      );
    }
  }, [props.route.params.barcode]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.data.name + " Periyodik",
    });
  }, []);

  if (
    props.route.params.barcode === undefined ||
    props.route.params.barcode !== props.route.params.data.barcode
  ) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Box
          minHeight={230}
          backgroundColor="white"
          m="m"
          borderRadius="xl"
          p="l"
        >
          {!!props.route.params.data.inventoryPhotoPath ? (
            <Image
              source={{ uri: props.route.params.data.inventoryPhotoPath }}
              style={{ width: "100%", height: 100, resizeMode: "contain" }}
            />
          ) : (
            <Box alignItems="center">
              <MaterialIcons name="image" size={100} color="gray" />
            </Box>
          )}
          <Box height={30} />
          <KeyValue
            title="Ekipman Adı"
            value={props.route.params.data.name as string}
          />
          <KeyValue
            title="Tesis"
            value={props.route.params.data.campusName as string}
          />
          <KeyValue
            title="Bina"
            value={props.route.params.data.buildName as string}
          />
          <KeyValue
            title="Kat"
            value={props.route.params.data.floorName as string}
          />
          <KeyValue
            title="Oda"
            value={props.route.params.data.roomName as string}
          />
        </Box>
        <Box
          minHeight={230}
          backgroundColor="white"
          m="m"
          mt="zero"
          borderRadius="xl"
          p="l"
          justifyContent="space-between"
        >
          <Box alignItems="center">
            <Ionicons name="barcode-outline" size={100} />
          </Box>
          <Box my="m">
            <Text variant="body">
              Bakım yapmak için ekipman barkodu taratılmalıdır!
            </Text>
          </Box>
          <Button
            onPress={() => {
              props.navigation.navigate("Barcode", {
                ...props.route.params,
                maintenanceIssueId: props.route.params.data.id,
                screenTitle: "Barkod Tarat",
                backUrl: "DoLegalIssue",
              });
            }}
            label="Barkod Tarat"
            colorScheme="blue"
          />
        </Box>
      </ScrollView>
    );
  }

  return (
    <Box flex={1}>
      <LegalIssueMaker
        maintenance={props.route.params.data}
        requires={props.route.params}
      />
    </Box>
  );
};

export default LegalIssueDo;
