import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../config';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrix.HorizontalSize(24),
    backgroundColor: Colors.white,
    flex: 1,
    marginBottom: Metrix.VerticalSize(74),
  },

  flatlist: {
    // paddingHorizontal: Metrix.HorizontalSize(24),
    marginHorizontal: Metrix.HorizontalSize(-24),
    marginTop: Metrix.VerticalSize(22),
    // backgroundColor: Colors.green,
  },
  contentContainer: {
    paddingTop: Metrix.VerticalSize(2),
    paddingHorizontal: Metrix.HorizontalSize(24),
    gap: Metrix.HorizontalSize(12),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
