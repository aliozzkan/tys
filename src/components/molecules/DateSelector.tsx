import React, { FC, useState } from "react";
import { Box, Text, Button } from "../";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme";
import { TouchableOpacity, Modal, Platform, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onChange?: (value: Date | Moment.Moment | string) => void;
  mode?: "momentable" | "backendable" | "date";
}

const DateSelector: FC<Props> = (props) => {
  const colorMode = useColorScheme();
  const [show, setShow] = useState<boolean>(false);
  const [oldDate, setOldDate] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();

  function onChange(date: Date) {
    if (props.onChange) {
      if (props.mode === "date") {
        props.onChange(date);
      }
      if (props.mode === "momentable") {
        props.onChange(Moment(date));
      }
      if (props.mode === "backendable") {
        props.onChange(Moment(date).format("YYYY-MM-DD"));
      }
    }
  }

  return (
    <Box flex={1}>
      {Platform.OS === "ios" && (
        <Modal transparent={false} visible={show}>
          <Box
            backgroundColor={colorMode === "light" ? "purple.100" : "purple.700"}
            style={{ paddingTop: insets.top + 30 }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(value: any, selectedDate: any) => {
                setOldDate(date);
                setDate(selectedDate);
              }}
            />
          </Box>
          <Box flexDirection="row" p="m" justifyContent="flex-end">
            <Button
              label="Kapat"
              variant="link"
              colorScheme="gray"
              onPress={() => {
                setDate(oldDate);
                setShow(false);
              }}
            />
            <Button
              label="Seç"
              colorScheme="blue"
              variant="link"
              onPress={() => {
                if (props.onChange) {
                  props.onChange(date);
                }
                setShow(false);
              }}
            />
          </Box>
        </Modal>
      )}
      {Platform.OS === "android" && show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display={"calendar"}
          onChange={(value: any, selectedDate: any) => {
            if (selectedDate) {
              setOldDate(date);
              setDate(selectedDate);
              onChange(selectedDate);
            }
            setShow(false);
          }}
        />
      )}
      <Text variant="body" mb="xs" color="teal.500">
        {Moment(date).format("DD MMMM YYYY, dddd")}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        <Box
          borderWidth={1}
          borderColor="gray.400"
          borderStyle="dashed"
          p="m"
          backgroundColor="teal.50"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name="calendar" size={30} color={colors.teal["500"]} />
          <Text color="teal.500">Tarih Seç</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

DateSelector.defaultProps = {
  mode: "date",
};

export default DateSelector;
