import {StyleSheet} from 'react-native';

import {Colors, Metrix} from '../../config';

const styles = StyleSheet.create({
  containerCommon: {
    flexDirection: 'row',
    marginTop: Metrix.VerticalSize(20),
    marginBottom: Metrix.VerticalSize(3),
    paddingHorizontal: 16,
  },

  stepContainer: {
    minWidth: Metrix.HorizontalSize(129),
    maxWidth: Metrix.HorizontalSize(177),
    paddingHorizontal: Metrix.HorizontalSize(26),
    height: Metrix.VerticalSize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: Metrix.HorizontalSize(2),
    marginHorizontal: 1,
    backgroundColor: Colors.primary,
  },

  iconContainer: {
    width: Metrix.HorizontalSize(11),
    height: Metrix.HorizontalSize(11),
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Metrix.HorizontalSize(5),
  },

  animatedView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: Metrix.HorizontalSize(135),
    height: Metrix.HorizontalSize(30),
    backgroundColor: Colors.primary,
    zIndex: -5,
    left: Metrix.HorizontalSize(16),
    borderTopRightRadius: Metrix.customFontSize(25),
    borderBottomRightRadius: Metrix.customFontSize(25),
  },
});

export default styles;
