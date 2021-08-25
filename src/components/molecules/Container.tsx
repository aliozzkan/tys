import React, { FC } from "react";
import { ScrollView, Platform } from "react-native";
import Box from "../atoms/Box";
import KeyboardView from "./KeyboardView";

interface Props {
  keyboardable?: boolean;
  scrollabe?: boolean;
}

const Container: FC<Props> = (props) => {
  function getContent() {
    let ctx = !!props.scrollabe ? <ScrollView 
    showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    >{props.children}</ScrollView>: <Box flex={1}>{props.children}</Box>;

    return !!props.keyboardable ? <KeyboardView>{ctx}</KeyboardView> : ctx;
  }
  
  return getContent();
}

export default Container;