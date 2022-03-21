import React from "react";
import { Card, Box, Text, KeyValue } from "../";
import { IFollowDoc } from "../../models/timeline";
import Moment from "moment";
import { FontFamily } from "../../LoadAssets";
import IssueButton from "../molecules/IssueButton";
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
  data: IFollowDoc;
}

const FollowDocItem = (props: Props) => {
  const maintenanceDate = Moment(props.data.endDate);
  const navigation = useNavigation<any>();

  return (
    <Card variant="timelineItemDocument">
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
            <Text fontFamily={FontFamily.MonserratSemibold} fontSize={18} lineHeight={18}>
              {props.data.documentName}
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
          <KeyValue title="Periyot" value={props.data.documentPeriodName} />
          <KeyValue
            title="Planlı Bakım Tarihi"
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
            <Text color="gray.600" fontSize={14} lineHeight={14}>{props.data.statusDesc}</Text>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row">
        {[TimelineStatus.completed, TimelineStatus.lateDone].includes(props.data.status) && (
          <IssueButton
          color="green"
          label="Gerçekleşti"
          onPress={() => {}}
          leftIcon="check"
          disabled
        />
        )}
        {[TimelineStatus.notTime].includes(props.data.status) && (
          <IssueButton
          color="yellow"
          label="Zamanı Bekleniyor"
          onPress={() => {}}
          leftIcon="clock"
          disabled
        />
        )}
        {[TimelineStatus.late, TimelineStatus.ready].includes(
          props.data.status
        ) && (
          <IssueButton
            color="blue"
            label="İşlem Yap"
            onPress={() => {
              navigation.navigate("DoFollowDocIssueStack", {
                screen: "FollowDocDo",
                params: { data: props.data },
              });
            }}
            rightIcon="arrow-right"
          />
        )}
        {[TimelineStatus.needDocument].includes(props.data.status) && (
          <IssueButton
            color="purple"
            label="Doküman Yükle"
            onPress={() => {
              navigation.navigate("DoFollowDocIssueStack", {
                screen: "FollowDocUpload",
                params: { data: props.data },
              });
            }}
            rightIcon="arrow-right"
          />
        )}
      </Box>
    </Card>
  );
};

export default FollowDocItem;
