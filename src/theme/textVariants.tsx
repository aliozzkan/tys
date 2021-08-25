import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontFamily } from "../LoadAssets";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

function fS(size: number) {
  return RFValue(size, width);
}


export const textVariants = {
  header: {
    fontFamily: FontFamily.MonserratSemibold,
    fontWeight: "bold",
    fontSize: RFValue(24),
    lineHeight: RFValue(30),
    color: "gray.700",
    marginBottom: "m",
  },
  subheader: {
    fontFamily: FontFamily.MonserratSemibold,
    fontSize: RFValue(18),
    lineHeight: RFValue(20),
    color: "gray.700",
    marginBottom: "s",
  },
  body: {
    fontFamily: FontFamily.RalewayRegular,
    fontSize: RFValue(12),
    lineHeight: RFValue(13),
    color: "gray.700",
  },
  small: {
    fontFamily: FontFamily.RalewayRegular,
    fontSize: RFValue(10),
    lineHeight: RFValue(10),
    color: "gray.700",
  },
  smallest: {
    fontFamily: FontFamily.RalewayRegular,
    fontSize: RFValue(9),
    lineHeight: RFValue(9),
    color: "gray.700",
  },
  bodyHeader: {
    fontFamily: FontFamily.MonserratSemibold,
    fontSize: RFValue(14),
    lineHeight: RFValue(14),
    color: "gray.900",
  },
};
