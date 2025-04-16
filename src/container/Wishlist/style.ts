import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(24),
    justifyContent: 'space-between',
  },
  freeTextContainer: {
    width: '130%',
    height: Metrix.VerticalSize(40),
    backgroundColor: Colors.lightgreen,
    marginHorizontal: Metrix.HorizontalSize(-24),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(16),
  },

  cartedItemCard: {
    paddingHorizontal: Metrix.HorizontalSize(10),
    width: '100%',
    height: Metrix.VerticalSize(120),
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greyV4,
    marginBottom: Metrix.VerticalSize(16),
    overflow: 'hidden',
  },
  productImage: {
    width: Metrix.HorizontalSize(100),
    height: '100%',
    resizeMode: 'contain',
  },

  cardContent: {
    paddingVertical: Metrix.VerticalSize(24),
    flex: 1,
  },

  counterRow: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(8),
  },

  counterButton: {
    width: Metrix.HorizontalSize(23),
    height: Metrix.VerticalSize(23),
    backgroundColor: '#faf9ff',
    borderRadius: 3,
    borderColor: '#eee',
    borderWidth: 1,
  },
});

export default styles;
