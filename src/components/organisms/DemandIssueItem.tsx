import { FontAwesome } from "@expo/vector-icons";
import Moment from "moment";
import React from "react";
import { Box, Divider, KeyValue, Text, Card, IssueButton } from "../";
import { IDemand } from "../../models/timeline";
import { colors } from "../../theme";
import { DemandIssueStackNavigationProps } from "../../navigations/stacks/DemandIssue/DemandIssueStack";
import { useNavigation } from "@react-navigation/native";

interface Props {
  data: IDemand;
}

const DemandIssueItem = (props: Props) => {
  const navigation = useNavigation<DemandIssueStackNavigationProps>();
  const { data: dem } = props;
  const isRequiredDoc = dem.documents
    .map((item) => item.isCompleted)
    .includes(false);
  return (
    <Card variant="timelineItem">
      <Box p="l">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="bodyHeader">{dem.demandName}</Text>
          {!!isRequiredDoc && (
            <Box
              backgroundColor="orange.100"
              p="xs"
              px="s"
              borderRadius="s"
              flexDirection="row"
              alignItems="center"
            >
              <FontAwesome
                name="exclamation"
                size={16}
                color={colors.orange["500"]}
              />
              <Text color="orange.500" ml="xs">
                Doküman Gerekli
              </Text>
            </Box>
          )}
        </Box>
        <Divider />
        <KeyValue title="Tesis" value={dem.campusName} />
        <KeyValue title="Bina" value={dem.buildName} />
        <KeyValue title="Kat" value={dem.floorName} />
        <KeyValue title="Oda" value={dem.roomName} />
        <KeyValue title="Kullanıcı Tipi" value={dem.userTypeName} />
        <KeyValue
          title="Oluşturulma Tarihi"
          value={Moment(dem.demandCreateDate).format("DD.MM.YYYY")}
        />
      </Box>
      <Box flexDirection="row">
        <IssueButton
          color={isRequiredDoc ? "orange" : "gray"}
          onPress={() => {
            navigation.navigate("Docs", { demand: dem });
          }}
          label="Dokümanlar"
          rightIcon="arrow-right"
        />
      </Box>
    </Card>
  );
};

export default DemandIssueItem;
