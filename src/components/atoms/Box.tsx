import { createBox, BoxProps as ShopifyBoxProps } from "@shopify/restyle";
import { Theme } from "../../theme";

const Box = createBox<Theme>();

export type BoxProps = ShopifyBoxProps<Theme>;
export default Box;
