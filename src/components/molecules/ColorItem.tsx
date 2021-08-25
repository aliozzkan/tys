import React, {FC} from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {Box, Text} from '../'


interface ColorItemProps {
  code: number | string;
  color: string;
  desc: string;
}
const ColorItem: FC<ColorItemProps> = (props) => {
  return (
    <Box p="l" backgroundColor="white" justifyContent="space-between" flexDirection="row" alignItems="center" mx="m" mt="m">
      <Box
        width={20}
        height={20}
        style={{ backgroundColor: props.color }}
      ></Box>
      <Box width={widthPercentageToDP(78) - 30} >
        <Text variant="body">{props.desc}</Text>
      </Box>
    </Box>
  );
};

export default ColorItem;