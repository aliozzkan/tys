import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Box, AdvancedListHeader, Text, KeyValue } from "../components";
import MaintenanceIssueItem from "../components/organisms/MaintenanceIssueItem";
import MaintenanceIssueList from "../components/organisms/MaintenanceIssueList";
import { useAuth, useRedux } from "../hooks/redux-hooks";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";
import { Hooks } from "../services";

const MaintenanceDetail: FC<MaintenanceIssueStackProps<"MaintenanceDetail">> = (
  props
) => {
  const listRef = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
  const detailManager = Hooks.InventoryDetailByBarcode();
  const timelineManager = Hooks.MaintenanceTimeline();
  const { project } = useAuth();

  function _getList() {
    timelineManager.fetch(project.id);
  }

  useLayoutEffect(() => {
    _getList();
    detailManager.fetch(props.route.params.barcode);
  }, []);
  const [
    {
      app: { selectedCampus },
    },
  ] = useRedux();
  return (
    <Box flex={1}>
      {!detailManager.isFullfilled && <ActivityIndicator />}

      {!!detailManager.data?.data?.data && (
        <Box width="100%" px="l">
          <FlatList
            data={timelineManager.data?.data.data.filter(
              (item: any) => item.barcode === props.route.params.barcode
            )}
            ListHeaderComponent={() => (
              <Box pb="l" bg="white" p="l" mb="l">
                {!!detailManager.data?.data.data.inventoryPhoto && (
                  <Box alignItems="center">
                    <Image
                      source={{
                        uri: detailManager.data.data.data.inventoryPhoto,
                      }}
                      style={{ width: 250, height: 200, resizeMode: "contain" }}
                    />
                  </Box>
                )}
                <Text variant="bodyHeader" mt="m">
                  Genel Bilgiler
                </Text>
                <KeyValue
                  title="#ID"
                  value={detailManager.data?.data.data.id?.toString() as string}
                />
                <KeyValue
                  title="Ekipman Adı"
                  value={detailManager.data?.data.data.name as string}
                />
                <KeyValue
                  title="Barkod"
                  value={detailManager.data?.data.data.barcode as string}
                />
                <KeyValue
                  title="Seri No"
                  value={detailManager.data?.data.data.serialNumber as string}
                />
                <KeyValue
                  title="Asset No"
                  value={detailManager.data?.data.data.assetNo as string}
                />
                <KeyValue
                  title="Birim"
                  value={detailManager.data?.data.data.unit as string}
                />
                <KeyValue
                  title="Kapasite"
                  value={detailManager.data?.data.data.capacityName as string}
                />
                <Text variant="bodyHeader" mt="m">
                  Lokasyon Bilgileri
                </Text>
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

                <Text variant="bodyHeader" mt="m">
                  Model Bilgileri
                </Text>
                <KeyValue
                  title="Grup"
                  value={detailManager.data?.data.data.groupName as string}
                />
                <KeyValue
                  title="Marka"
                  value={detailManager.data?.data.data.brandName as string}
                />
                <KeyValue
                  title="Model"
                  value={detailManager.data?.data.data.modelName as string}
                />
              </Box>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <Box my="zero" style={{ marginBottom: 16 }} />
            )}
            renderItem={({ item, index }) => (
              <MaintenanceIssueItem data={item} index={index} />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default MaintenanceDetail;
