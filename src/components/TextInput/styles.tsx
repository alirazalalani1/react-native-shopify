import {StyleSheet} from 'react-native';
import {Colors, fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  gradientWrapper: {
    height: Metrix.VerticalSize(56),
    borderRadius: Metrix.Radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: Metrix.VerticalSize(56),
    flex: 1,
    ...fonts.medium(),
  },
  inputContainer: {
    gap: 5,
    height: Metrix.VerticalSize(60),
    width: '99%',
    backgroundColor: 'pink',
    borderRadius: Metrix.Radius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrix.HorizontalSize(10),
    borderBottomWidth: 1,
    // borderBottomColor: Colors.green,
  },

  iconContainer: {
    marginRight: 10,
  },

  mailIcon: {},
});

export const gradientColors = [
  '#FDDB32',
  '#FBCF35',
  '#F9B140',
  '#F47F50',
  '#EF3C67',
  '#EC1A73',
  '#B53689',
  '#8052A0',
];

export default styles;
