import {StyleSheet, View} from 'react-native';

import {Colors, Metrix, SVGS} from '../../config';
import {Flex} from '../index';

const BackHeader = () => {
  return (
    <Flex style={styles.container}>
      <SVGS.BackIcon color={Colors.black} width={15} height={15} />
      <View>
        <SVGS.Cart width={20} height={20} />
      </View>
    </Flex>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrix.VerticalSize(30),
    backgroundColor: Colors.lightgreen,
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(24),
  },
});
