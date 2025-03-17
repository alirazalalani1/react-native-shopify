import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Metrix} from '../../config';
import {Typography} from '../index';

type Props = {
  title: string;
  onPress?: () => void;
  mT?: number;
  mB?: number;
};

const Button = ({title = 'Button', onPress, mT = 0, mB = 0}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={Metrix.ActiveOpacity}
      style={[
        styles.container,
        {
          marginTop: Metrix.VerticalSize(mT),
          marginBottom: Metrix.VerticalSize(mB),
        },
      ]}>
      <Typography textAlign="center" color={Colors.white} medium size={17}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrix.VerticalSize(60),
    backgroundColor: Colors.black,
    borderRadius: Metrix.Radius,
    justifyContent: 'center',
  },
});
