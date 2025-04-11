import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../../config';

const styles = StyleSheet.create({
  container: {
    width: Metrix.HorizontalSize(155),
    height: Metrix.VerticalSize(250),
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greyV4,
    marginBottom: Metrix.VerticalSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  saleBadgeCont: {
    width: Metrix.HorizontalSize(50),
    padding: Metrix.HorizontalSize(4),
    backgroundColor: '#a3d2a2',
    position: 'absolute',
    overflow: 'hidden',

    right: 0,
    top: 0,
    zIndex: 1,
  },
  starIcon: {
    width: Metrix.HorizontalSize(15),
    height: Metrix.VerticalSize(15),
  },
});

export default styles;
