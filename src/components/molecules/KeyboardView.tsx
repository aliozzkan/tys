import React, { FC } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

interface Props {}

const KeyboardView: FC<Props> = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
