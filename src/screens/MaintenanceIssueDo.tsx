import React, { FC, useLayoutEffect, useEffect } from "react";
import { ActivityIndicator, ScrollView, Alert, Image } from "react-native";
import {
  Box,
  Button,
  KeyValue,
  Text,
  MaintenanceIssueMaker,
} from "../components";
import { useAuth } from "../hooks/redux-hooks";
import { DoMaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/DoMaintenanceIssueStack";
import { Hooks } from "../services";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const MaintenanceIssueDo: FC<
  DoMaintenanceIssueStackProps<"DoMaintenanceIssue">
> = (props) => {
  const { project } = useAuth();
  const detailManager = Hooks.MaintenanceTimelineDetail();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.screenTitle,
    });
    detailManager.fetch(props.route.params.maintenanceIssueId);
  }, []);

  useEffect(() => {
    if (
      props.route.params.barcode !== undefined &&
      props.route.params.barcode !== detailManager.data?.data.data.barcode
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

  if (!!!detailManager.isFullfilled) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" pb="xxl">
        <ActivityIndicator />
      </Box>
    );
  }

  if (
    (props.route.params.barcode === undefined ||
    props.route.params.barcode !== detailManager.data?.data.data.barcode) && !__DEV__
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
          {!!detailManager.data?.data.data.inventoryPhotoPath ? (
            <Image
              source={{ uri: detailManager.data?.data.data.inventoryPhotoPath }}
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
            value={detailManager.data?.data.data.name as string}
          />
          <KeyValue
            title="Bakım Tipi"
            value={detailManager.data?.data.data.maintenanceTypeName as string}
          />
          <KeyValue
            title="Periyot"
            value={
              detailManager.data?.data.data.maintenancePeriodName as string
            }
          />
          <KeyValue
            title="Tesis"
            value={detailManager.data?.data.data.campusName as string}
          />
          <KeyValue
            title="Bina"
            value={detailManager.data?.data.data.buildName as string}
          />
          <KeyValue
            title="Kat"
            value={detailManager.data?.data.data.floorName as string}
          />
          <KeyValue
            title="Oda"
            value={detailManager.data?.data.data.roomName as string}
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
              props.navigation.navigate("Barcode", { ...props.route.params, backUrl: "DoMaintenanceIssue" });
            }}
            label="Barkod Tarat"
            colorScheme="blue"
          />
        </Box>
      </ScrollView>
    );
  }

  return (
    <MaintenanceIssueMaker
      maintenance={detailManager.data?.data.data!}
      requires={props.route.params}
    />
  );
};

export default MaintenanceIssueDo;
