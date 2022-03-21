import React from "react";
import { Card, Box, Text, KeyValue } from "../";
import { IControlTask } from "../../models/timeline";
import Moment from "moment";
import { FontFamily } from "../../LoadAssets";
import IssueButton from "../molecules/IssueButton";
import { useNavigation } from "@react-navigation/native";

export enum TimelineStatus {
  wait = 1,
  done = 2,
  ready = 3,
  late = 4,
  lateDone = 5,
}

interface Props {
  data: IControlTask;
}

const ControlTaskItem = (props: Props) => {
  const navigation = useNavigation<any>();
  const maintenanceDate = Moment(props.data.endDate);

  return (
    <Card variant="timelineItemControl">
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
              {props.data.controlName}
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
          <KeyValue title="Periyot" value={props.data.controlPeriodName} />
          <KeyValue title="Kullanıcı" value={props.data.userName} />
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
        {[TimelineStatus.ready, TimelineStatus.late].includes(
          props.data.statusCode
        ) && (
          <IssueButton
            label="İşlem Yap"
            color="blue"
            onPress={() => {
              navigation.navigate("DoControlTaskIssueStack", {
                screen: "ControlTaskDo",
                params: { data: props.data },
              });
            }}
          />
        )}
        {[TimelineStatus.lateDone, TimelineStatus.done].includes(
          props.data.statusCode
        ) && (
          <IssueButton
            label="Gerçekleşti"
            leftIcon="check"
            color="green"
            disabled
            onPress={() => {}}
          />
        )}
        {[TimelineStatus.wait].includes(props.data.statusCode) && (
          <IssueButton
            label="Zamanı Bekleniyor"
            leftIcon="clock"
            color="yellow"
            disabled
            onPress={() => {}}
          />
        )}
      </Box>
    </Card>
  );
};

export default ControlTaskItem;
