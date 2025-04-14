import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Metrix} from '../../config';
import {Typography} from '../index';

type Props = {
  title: string;
  onPress?: () => void;
  mT?: number;
  mB?: number;
  width?: number;
  height?: number;
  textSize?: number;
  disabled?: boolean;
};

const Button = ({
  title = 'Button',
  onPress,
  mT = 0,
  mB = 0,
  width,
  height = 60,
  textSize = 17,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={Metrix.ActiveOpacity}
      disabled={disabled}
      style={[
        styles.container,
        {
          marginTop: Metrix.VerticalSize(mT),
          marginBottom: Metrix.VerticalSize(mB),
          width: width ? Metrix.HorizontalSize(width) : '100%',
          height: Metrix.VerticalSize(height),
        },
        disabled && {backgroundColor: Colors.greyV3},
      ]}>
      <Typography
        textAlign="center"
        color={Colors.white}
        medium
        size={textSize}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(60),
    backgroundColor: Colors.black,
    borderRadius: Metrix.Radius,
    justifyContent: 'center',
  },
});
