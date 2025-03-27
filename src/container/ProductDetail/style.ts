import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrix.HorizontalSize(24),
    backgroundColor: Colors.white,
  },
  saleBadgeCont: {
    width: Metrix.HorizontalSize(55),
    padding: 4,
    backgroundColor: Colors.lightgreen,
    position: 'absolute',
    top: Metrix.VerticalSize(20),
    borderRadius: 4,
    zIndex: 1,
  },
  wishlistCont: {
    width: Metrix.HorizontalSize(45),
    height: Metrix.HorizontalSize(45),
    borderRadius: 50,
    backgroundColor: Colors.white,
    borderColor: Colors.greyV4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    width: Metrix.HorizontalSize(15),
    height: Metrix.VerticalSize(15),
  },
  counterContainer: {
    width: Metrix.HorizontalSize(110),
    height: Metrix.VerticalSize(50),
    backgroundColor: '#faf9ff',
    borderColor: '#eee',
    borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(6),
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default styles;
