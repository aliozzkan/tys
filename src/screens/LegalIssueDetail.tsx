import React, { FC, Fragment, useLayoutEffect } from "react";
import { Box, Text, KeyValue, Card } from "../components";
import { ActivityIndicator, ScrollView } from "react-native";
import Moment from "moment";
import { LegalIssueStackProps } from "../navigations/stacks/LegalIssue/LegalIssueStack";

type Props = LegalIssueStackProps<"LegalIssueDetail">;

const LegalIssueDetailScreen = (props: Props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.screenTitle + " Periyodik",
    });
  }, []);
  const { data } = props.route.params;
  return (
    <ScrollView>
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
          <KeyValue title="#ID" value={data.id.toString()} />
          <KeyValue title="Ad" value={data.inventoryName} />
          <KeyValue title="Barkod" value={data.barcode} />
          <KeyValue title="Seri No" value={data.serialNumber} />
          <KeyValue title="Asset No" value={data.assetNo} />
          <KeyValue title="Birim" value={data.unit} />
          <KeyValue title="Kapasite" value={data.inventoryCapacityName} />
          <Text variant="bodyHeader" mt="m">
            Lokasyon Bilgileri
          </Text>
          <KeyValue title="Tesis" value={data.campusName} />
          <KeyValue title="Bina" value={data.buildName as string} />
          <KeyValue title="Kat" value={data.floorName as string} />
          <KeyValue title="Oda" value={data.roomName as string} />

          <Text variant="bodyHeader" mt="m">
            Model Bilgileri
          </Text>
          <KeyValue title="Grup" value={data.groupName as string} />
          <KeyValue title="Marka" value={data.brandName as string} />
          <KeyValue title="Model" value={data.modelName as string} />
        </Box>
      </Box>
      <Box mx="m" mt="m" flexDirection="row" alignItems="center">
        <Text variant="bodyHeader">Bak??m Bilgileri</Text>
        <Box height={1} backgroundColor="gray.500" flex={1} ml="m" />
      </Box>
      <Box m="m" mt="s" backgroundColor="white" borderRadius="l">
        <Box p="m">
          <Text variant="bodyHeader" >
            Bak??m Tarihleri
          </Text>
          <KeyValue
            title="Planl?? Ba??lang???? Tarihi"
            value={Moment(data.startDate).format("DD.MM.YYYY") as string}
          />
          <KeyValue
            title="Planl?? Bak??m Tarihi"
            value={Moment(data.endDate).format("DD.MM.YYYY") as string}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default LegalIssueDetailScreen;
