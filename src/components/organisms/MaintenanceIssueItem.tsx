import React, { FC } from "react";
import { Box, Text, KeyValue, IssueButton, Card } from "../";
import { IMaintenanceIssue } from "../../models/timeline";
import Moment from "moment";
import { TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../LoadAssets";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface MaintenanceIssueItemProps {
  data: IMaintenanceIssue;
}

enum MaintenanceStatus {
  done = 1,
  undone = 2,
  late = 6,
  lateDone = 7,
  wait = 2,
  not = 3,
  ready = 4,
}

const MaintenanceIssueItem: FC<MaintenanceIssueItemProps> = (props) => {
  const navigation = useNavigation<any>();
  const maintenanceDate = Moment(props.data.endDate);

  function goSide(screenType: "do" | "detail") {
    if (screenType === "detail") {
      navigation.navigate(
        screenType === "detail"
          ? "MaintenanceIssueDetail"
          : "MaintenanceIssueDo",
        {
          maintenanceIssueId: props.data.id,
          screenTitle: `${props.data.inventoryName} - İç Bakım`,
        }
      );
    } else {
      navigation.navigate("MaintenanceIssueDo", {
        screen: "DoMaintenanceIssue",
        params: {
          maintenanceIssueId: props.data.id,
          screenTitle: `${props.data.inventoryName} - İç Bakım`,
        },
      });
    }
  }

  return (
      <Card variant="timelineItemBig">
        <Box flexDirection="row" alignItems="flex-start">
          <Box
            backgroundColor={
              props.data.isMaintenanceComplete ? "green.50" : "gray.50"
            }
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
                  backgroundColor:
                    props.data.maintenanceTransactionStatusColorCode,
                }}
                width={20}
                height={20}
              />
            </Box>

            <Box height={1} backgroundColor="gray.400" width="100%" mt="s" />
            <KeyValue title="Tesis" value={props.data.campusName} />
            <KeyValue
              title="Periyot"
              value={props.data.maintenancePeriodName}
            />
            <KeyValue title="Barkod" value={props.data.barcode} />
            <KeyValue
              title="Bakım Tipi"
              value={props.data.maintenanceTypeName}
            />
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
              <Text color="gray.600">
                {props.data.maintenanceTransactionStatusDescription}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box flexDirection="row">
          {props.data.isMaintenanceComplete ? (
            <Box
              flex={1}
              backgroundColor="green.400"
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
            >
              <Box mr="s">
                <Feather name="check" color="white" size={20} />
              </Box>
              <Text
                color="green.50"
                variant="body"
                fontFamily={FontFamily.RalewaySemibold}
              >
                Gerçekleşti
              </Text>
            </Box>
          ) : [MaintenanceStatus.ready, MaintenanceStatus.late].includes(
              props.data.maintenanceTransactionStatus
            ) ? (
            <TouchableOpacity
              style={{ flex: 1, height: 50 }}
              onPress={() => goSide("do")}
            >
              <Box
                flex={1}
                backgroundColor="blue.400"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="blue.50"
                  variant="body"
                  fontFamily={FontFamily.RalewaySemibold}
                >
                  Bakım Yap
                </Text>
              </Box>
            </TouchableOpacity>
          ) : (
            <Box
              flex={1}
              backgroundColor="yellow.400"
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
            >
              <Box mr="s">
                <Feather name="clock" color="white" size={20} />
              </Box>
              <Text
                color="green.50"
                variant="body"
                fontFamily={FontFamily.RalewaySemibold}
              >
                Bakım Bekleniyor
              </Text>
            </Box>
          )}
          <IssueButton
            label="Detay"
            color="gray"
            onPress={() => {
              goSide("detail");
            }}
            rightIcon="arrow-right"
          />
        </Box>
      </Card>
  );
};

export default MaintenanceIssueItem;
