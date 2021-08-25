import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import { Box } from "../";

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
}

const Checkbox: FC<Props> = (props) => {
  return (
    <Box
      backgroundColor={props.value ? "blue.100" : "gray.100"}
      alignItems="center"
      justifyContent="center"
      borderRadius="s"
      width={20}
      height={20}
    >
      {props.value && <Feather name="check" size={14} />}
    </Box>
  );
};

export default Checkbox;
