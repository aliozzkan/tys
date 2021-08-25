import React, { FC } from "react";
import { Box, KeyValue, Text, IssueButton } from "../";
import { ILegal } from "../../models/timeline";
import Card from "../atoms/Card";
import Moment from "moment";
import { FontFamily } from "../../LoadAssets";
import { LegalIssueStackNavigationProps } from "../../navigations/stacks/LegalIssue/LegalIssueStack";
import { useNavigation } from "@react-navigation/native";

export enum TimelineStatus {
  completed = 2,
  notTime = 1,
  late = 4,
  ready = 3,
  needDocument = 5,
  lateDone = 6,
}

interface Props {
  data: ILegal;
}

const LegalIssueItem: FC<Props> = (props) => {
  const maintenanceDate = Moment(props.data.endDate);
  const navigation = useNavigation<any>();

  return (
    <Card variant="timelineItem">
      <Box flexDirection="row" alignItems="flex-start">
        <Box
          backgroundColor={props.data.isCompleted ? "green.50" : "gray.50"}
          p="m"
          pb="xl"
          width={105}
          alignItems="center"
        >
          <Text variant="header" mt="m">
            {maintenanceDate.format("DD")}
          </Text>
          <Text variant="body">{maintenanceDate.format("MMMM")}</Text>
        </Box>
        <Box p="m" flex={1} width="100%">
          <Box flexDirection="row" justifyContent="space-between">
            <Text fontFamily={FontFamily.MonserratSemibold} fontSize={18}>
              {props.data.inventoryName}
            </Text>
            <Box
              borderRadius="s"
              style={{
                backgroundColor: props.data.statusColor,
              }}
              width={20}
              height={20}
            />
          </Box>
          <Box height={1} backgroundColor="gray.400" width="100%" mt="s" />
          <KeyValue title="Tesis" value={props.data.campusName} />
          <KeyValue title="Barkod" value={props.data.barcode} />
          <KeyValue
            title="Periyodik Kontrol Tarihi"
            value={Moment(props.data.endDate).format("DD.MM.YYYY")}
          />
          <KeyValue
            title="Kullanıcı Tipi"
            value={props.data.userTypeName}
            highlight
          />
          <Box
            flexDirection="row"
            mt="m"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text color="gray.600">{props.data.statusDesc}</Text>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row">
        {[TimelineStatus.late, TimelineStatus.ready].includes(
          props.data.status
        ) && (
          <IssueButton
            label="Bakım Yap"
            onPress={() => {
              navigation.navigate("DoLegalIssueStack", {
                screen: "DoLegalIssue",
                params: {
                  data: props.data,
                  requires: {},
                },
              });
            }}
            color="blue"
          />
        )}
        {[TimelineStatus.completed, TimelineStatus.lateDone].includes(
          props.data.status
        ) && (
          <IssueButton
            leftIcon="check"
            label="Gerçekleşti"
            onPress={() => {}}
            color="green"
            disabled
          />
        )}
        {[TimelineStatus.needDocument].includes(props.data.status) && (
          <IssueButton
            leftIcon="upload-cloud"
            label="Form Yükle"
            onPress={() => {
              navigation.navigate("DoLegalIssueStack", {
                screen: "Update",
                params: {
                  data: props.data,
                },
              });
            }}
            color="pink"
          />
        )}
        <IssueButton
          label="Detay"
          onPress={() => {
            navigation.navigate("LegalIssueDetail", {
              screenTitle: `${props.data.inventoryName}`,
              data: props.data,
            });
          }}
          color="gray"
          rightIcon="arrow-right"
        />
      </Box>
    </Card>
  );
};

export default LegalIssueItem;
