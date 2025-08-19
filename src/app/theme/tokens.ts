import { Dimensions, PixelRatio } from "react-native";

export const DWidth = Dimensions.get('screen').width;
export const DHeight = Dimensions.get('screen').height;

const wp = (widthPercent: string | number) => {
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((DWidth * elemWidth) / 100);
};

const hp = (heightPercent: string | number) => {
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((DHeight * elemHeight) / 100);
};

export const tokens = {
  radius: { lg: 20, xl: 28 },
  spacing: (n: number) => n * wp(2),
  font: { h1: hp(4), h2: hp(3), body: hp(2.5), small: hp(1.8) },
};
