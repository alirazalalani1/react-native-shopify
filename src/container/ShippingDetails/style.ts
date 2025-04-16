import {StyleSheet} from 'react-native';

import {Colors, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(24),
  },

  divider: {
    width: '100%',
    backgroundColor: Colors.greyV3,
    height: 1,
    marginTop: Metrix.VerticalSize(10),
    // borderColor: '#eee',
    // borderWidth: 0.5,
  },
});

export default styles;
