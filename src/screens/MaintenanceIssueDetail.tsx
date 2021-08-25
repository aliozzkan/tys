import React, { FC, Fragment, useLayoutEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Box, Text, KeyValue } from "../components";
import { MaintenanceIssueStackProps } from "../navigations/stacks/MaintenanceIssueStack/MaintenanceIssueStack";
import { Hooks } from "../services";
import Moment from 'moment'

const MaintenanceIssueDetail: FC<
  MaintenanceIssueStackProps<"MaintenanceIssueDetail">
> = (props) => {
  const detailManager = Hooks.MaintenanceTimelineDetail();

  useLayoutEffect(() => {
    detailManager.fetch(props.route.params.maintenanceIssueId);
    props.navigation.setOptions({ title: props.route.params.screenTitle });
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      {!detailManager.isFullfilled && (
        <Box flex={1} justifyContent="center" alignItems="center" >
          <ActivityIndicator />
        </Box>
      )}
      {detailManager.isFullfilled && (
        <Fragment>
          <Box mx="m" mt="m" flexDirection="row" alignItems="center">
            <Text variant="bodyHeader">Ekipman Bilgileri</Text>
            <Box height={1} backgroundColor="gray.500" flex={1} ml="m" />
          </Box>
          <Box
            m="m"
            mt="s"
            backgroundColor="white"
            minHeight={300}
            borderRadius="l"
          >
            <Box p="m">
              <Text variant="bodyHeader">Genel Bilgiler</Text>
              <KeyValue
                title="#ID"
                value={
                  detailManager.data?.data.data.inventoryID.toString() as string
                }
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
          </Box>
          <Box mx="m" mt="m" flexDirection="row" alignItems="center">
            <Text variant="bodyHeader">Bakım Bilgileri</Text>
            <Box height={1} backgroundColor="gray.500" flex={1} ml="m" />
          </Box>
          <Box
            m="m"
            mt="s"
            backgroundColor="white"
            borderRadius="l"
          >
            <Box p="m">
              <Text variant="bodyHeader">
                {detailManager.data?.data.data.maintenanceTypeName}
              </Text>
              <KeyValue
                title="Periyot"
                value={
                  detailManager.data?.data.data.maintenancePeriodName as string
                }
              />
              <KeyValue
                title="Planlı Başlangıç Tarihi"
                value={
                  Moment(detailManager.data?.data.data.startDate).format(
                    "DD.MM.YYYY"
                  ) as string
                }
              />
              <KeyValue
                title="Planlı Bakım Tarihi"
                value={
                  Moment(detailManager.data?.data.data.endDate).format(
                    "DD.MM.YYYY"
                  ) as string
                }
              />
            </Box>
          </Box>
        </Fragment>
      )}
    </ScrollView>
  );
};

export default MaintenanceIssueDetail;
