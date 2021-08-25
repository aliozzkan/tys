import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Box,
  Card,
  IssueButton,
  IssueFlatList,
  Text,
  Divider,
  KeyValue,
} from "../components";
import { IDemand } from "../models/timeline";
import { DemandIssueStackProps } from "../navigations/stacks/DemandIssue/DemandIssueStack";
import { colors } from "../theme";
import Moment from "moment";
import { useNavigation } from "@react-navigation/native";

const DemandDocs = (props: DemandIssueStackProps<"Docs">) => {
  return (
    <IssueFlatList
      data={props.route.params.demand.documents}
      ItemComponent={DemandDocItem}
      onRefresh={() => {}}
      refreshing={false}
      noRefresh
    />
  );
};

const DemandDocItem = (props: { data: IDemand["documents"][0] }) => {
  const navigation = useNavigation<any>();
  return (
    <Box
      backgroundColor="white"
      marginBottom="m"
      borderRadius="s"
      overflow="hidden"
    >
      <Box p="m">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="bodyHeader">{props.data.documentName}</Text>
          {!!!props.data.isCompleted && (
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
            </Box>
          )}
        </Box>
        <Divider />
        <Box>
          <KeyValue
            title="Yüklenmesi Gereken Son Tarih"
            value={Moment(props.data.lastDate).format("DD.MM.YYYY")}
          />
        </Box>
      </Box>
      <Box>
        {props.data.isCompleted ? (
          <IssueButton
            label="Doküman Yüklendi"
            color="green"
            onPress={() => {}}
            leftIcon="check"
            disabled={true}
          />
        ) : (
          <IssueButton
            label="Doküman Yükle"
            color="orange"
            onPress={() => {
              navigation.navigate("DoDemandIssueStack", {
                screen: "DemandDo",
                params: { data: props.data },
              });
            }}
            rightIcon="arrow-right"
          />
        )}
      </Box>
    </Box>
  );
};

export default DemandDocs;
