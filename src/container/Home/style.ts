import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../config';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    height: Metrix.VerticalSize(250),
    backgroundColor: Colors.lightgreen,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  headerImage: {
    marginTop: Metrix.VerticalSize(24),
    width: '60%',
    height: '90%',
    position: 'absolute',
    right: Metrix.HorizontalSize(-25),
  },
  headerTextContainer: {
    width: '70%',
  },
  flatlist: {
    paddingHorizontal: Metrix.HorizontalSize(24),
    marginHorizontal: Metrix.HorizontalSize(-24),
    marginTop: Metrix.VerticalSize(22),
  },
  contentContainer: {
    paddingBottom: Metrix.VerticalSize(75),
    paddingTop: Metrix.VerticalSize(2),
    gap: Metrix.HorizontalSize(12),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
