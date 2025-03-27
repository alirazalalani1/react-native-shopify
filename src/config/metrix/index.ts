import {Dimensions, PixelRatio, Platform} from 'react-native';
import {isIphoneX} from './isIphoneX';
let {height, width} = Dimensions.get('window');

height -= Platform.OS == 'ios' ? (isIphoneX() ? 70 : 20) : 24;

const scale = height / 812;

const VerticalSize = (size = 812) => (size / 812) * height;
const HorizontalSize = (size = 375) => (size / 375) * width;
const ScreenHeight = Dimensions.get('screen').height;
const ScreenWidth = Dimensions.get('screen').width;
const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const HitSlop = {
  top: VerticalSize(5),
  bottom: VerticalSize(5),
  left: HorizontalSize(5),
  right: HorizontalSize(5),
};

export default {
  Radius: VerticalSize(10),
  LightRadius: VerticalSize(6),
  ActiveOpacity: 0.6,
  customFontSize: normalize,
  FontRegular: normalize(17),
  FontExtraSmall: normalize(12),
  FontSmall: normalize(14),
  FontMedium: normalize(18),
  FontLarge: normalize(22),
  VerticalSize,
  HorizontalSize,
  ScreenHeight,
  ScreenWidth,
  HitSlop,
  FullOpacity: 1,
};
