import React, { FC, ReactElement, useState } from "react";
import Box, { BoxProps } from "./Box";

type Props = {
  children: ReactElement;
  ratio?: number;
} & BoxProps;

const AspectRatio: FC<Props> = (props) => {
  const [width, setWidth] = useState<number | null>(null);
  return (
    <Box
      onLayout={(event) => {
        var a = event.nativeEvent.layout;
        setWidth(a.width);
      }}
      height={!!width ? width * (1 / props.ratio!) : null}
      {...(props as any)}
    >
      {props.children}
    </Box>
  );
};

AspectRatio.defaultProps = {
  ratio: 1,
};

export default AspectRatio;
